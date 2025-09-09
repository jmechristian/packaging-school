// Next.js API route for fetching Google Analytics landing page stats
import { BetaAnalyticsDataClient } from '@google-analytics/data';

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { pagePath, startDate, endDate, propertyId } = req.query;

  // Validate required parameters
  if (!pagePath) {
    return res.status(400).json({ error: 'pagePath is required' });
  }

  try {
    // Check if required environment variables exist
    const requiredVars = [
      'GOOGLE_CLIENT_EMAIL',
      'GOOGLE_PRIVATE_KEY',
      'GOOGLE_PROJECT_ID',
    ];

    const missingVars = requiredVars.filter((varName) => !process.env[varName]);
    if (missingVars.length > 0) {
      return res.status(500).json({
        error: `Missing required environment variables: ${missingVars.join(
          ', '
        )}`,
      });
    }

    // Build credentials object from individual environment variables
    const credentials = {
      type: 'service_account',
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_CLIENT_ID,
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${encodeURIComponent(
        process.env.GOOGLE_CLIENT_EMAIL
      )}`,
      universe_domain: 'googleapis.com',
    };

    // Initialize the Analytics Data client
    const analyticsDataClient = new BetaAnalyticsDataClient({
      credentials,
    });

    // Use the provided property ID or default to your GA4 property
    const property = propertyId
      ? `properties/${propertyId}`
      : `properties/${process.env.GA4_PROPERTY_ID || 'G-02DBGHP71V'}`;

    // Fetch the analytics data
    const [response] = await analyticsDataClient.runReport({
      property,
      dateRanges: [
        {
          startDate: startDate || '30daysAgo',
          endDate: endDate || 'today',
        },
      ],
      dimensions: [
        { name: 'landingPage' },
        { name: 'sessionSource' },
        { name: 'sessionMedium' },
        { name: 'country' },
        { name: 'deviceCategory' },
        { name: 'operatingSystem' },
        { name: 'browser' },
      ],
      metrics: [
        { name: 'sessions' },
        { name: 'totalUsers' },
        { name: 'bounceRate' },
        { name: 'averageSessionDuration' },
        { name: 'screenPageViews' },
        { name: 'conversions' },
        { name: 'engagementRate' },
        { name: 'engagedSessions' },
        { name: 'userEngagementDuration' },
      ],
      dimensionFilter: {
        filter: {
          fieldName: 'landingPage',
          stringFilter: {
            matchType: 'EXACT',
            value: pagePath,
          },
        },
      },
      limit: 1000,
    });

    // Bot detection function
    const isLikelyBot = (item) => {
      // Calculate engagement time per active user for this row
      const totalSessionDurationForRow =
        item.averageSessionDuration * item.sessions;
      const engagementTimePerUser =
        item.totalUsers > 0 ? totalSessionDurationForRow / item.totalUsers : 0;

      const botIndicators = [
        // Very short engagement time per active user (2 seconds average means most traffic is bots)
        engagementTimePerUser < 5,
        // Very short sessions (strong bot indicator)
        item.averageSessionDuration < 10,
        // High bounce rate with short duration
        item.bounceRate > 0.8 && item.averageSessionDuration < 15,
        // Very low engagement rate
        item.engagementRate < 0.2,
        // Suspicious user agents (common bot patterns)
        item.browser &&
          (item.browser.toLowerCase().includes('bot') ||
            item.browser.toLowerCase().includes('crawler') ||
            item.browser.toLowerCase().includes('spider') ||
            item.browser.toLowerCase().includes('scraper')),
        // Suspicious operating systems
        item.operatingSystem &&
          (item.operatingSystem.toLowerCase().includes('bot') ||
            item.operatingSystem.toLowerCase().includes('crawler')),
        // Direct traffic with very short sessions (often bots)
        item.source === '(direct)' && item.averageSessionDuration < 5,
        // Very low page views per session
        item.screenPageViews / item.sessions < 1.2,
        // Very low user engagement duration
        item.userEngagementDuration < 10,
      ];

      return botIndicators.filter(Boolean).length >= 1; // Flag if 1+ indicators (more aggressive)
    };

    // Process the response
    const stats = {
      pagePath,
      dateRange: {
        startDate: startDate || '30daysAgo',
        endDate: endDate || 'today',
      },
      totalStats: {
        sessions: 0,
        totalUsers: 0,
        bounceRate: 0,
        averageSessionDuration: 0,
        screenPageViews: 0,
        conversions: 0,
        botSessions: 0,
        humanSessions: 0,
        botPercentage: 0,
        engagementTime: 0,
      },
      breakdown: [],
    };

    // Aggregate the data
    if (response.rows && response.rows.length > 0) {
      response.rows.forEach((row) => {
        const dimensions = row.dimensionValues;
        const metrics = row.metricValues;

        const rowData = {
          landingPage: dimensions[0]?.value,
          source: dimensions[1]?.value,
          medium: dimensions[2]?.value,
          country: dimensions[3]?.value,
          deviceCategory: dimensions[4]?.value,
          operatingSystem: dimensions[5]?.value,
          browser: dimensions[6]?.value,
          sessions: parseInt(metrics[0]?.value || '0'),
          totalUsers: parseInt(metrics[1]?.value || '0'),
          bounceRate: parseFloat(metrics[2]?.value || '0'),
          averageSessionDuration: parseFloat(metrics[3]?.value || '0'),
          screenPageViews: parseInt(metrics[4]?.value || '0'),
          conversions: parseInt(metrics[5]?.value || '0'),
          engagementRate: parseFloat(metrics[6]?.value || '0'),
          engagedSessions: parseInt(metrics[7]?.value || '0'),
          userEngagementDuration: parseFloat(metrics[8]?.value || '0'),
        };

        // Check if this is likely bot traffic
        const isBot = isLikelyBot(rowData);

        if (isBot) {
          // Count as bot traffic
          stats.totalStats.botSessions += rowData.sessions;
          rowData.isBot = true;
        } else {
          // Count as human traffic
          stats.totalStats.sessions += rowData.sessions;
          rowData.isBot = false;
        }

        // Always add to total stats (including bots) to match GA
        stats.totalStats.totalUsers += rowData.totalUsers;
        stats.totalStats.screenPageViews += rowData.screenPageViews;
        stats.totalStats.conversions += rowData.conversions;
        stats.totalStats.engagedSessions += rowData.engagedSessions;
        stats.totalStats.userEngagementDuration +=
          rowData.userEngagementDuration;

        // Store breakdown (including bot traffic for analysis)
        stats.breakdown.push(rowData);
      });

      // Calculate bot percentage
      const totalSessions =
        stats.totalStats.sessions + stats.totalStats.botSessions;
      stats.totalStats.botPercentage =
        totalSessions > 0
          ? (stats.totalStats.botSessions / totalSessions) * 100
          : 0;
      stats.totalStats.humanSessions = stats.totalStats.sessions;

      // Debug logging
      console.log('Bot Detection Results:', {
        totalSessions: totalSessions,
        botSessions: stats.totalStats.botSessions,
        humanSessions: stats.totalStats.sessions,
        botPercentage: stats.totalStats.botPercentage,
        sampleBotData: stats.breakdown
          .filter((item) => item.isBot)
          .slice(0, 3)
          .map((item) => ({
            source: item.source,
            sessions: item.sessions,
            users: item.totalUsers,
            avgSessionDuration: item.averageSessionDuration,
            userEngagementDuration: item.userEngagementDuration,
            engagementTimePerUser:
              item.totalUsers > 0
                ? item.userEngagementDuration / item.totalUsers
                : 0,
          })),
      });

      // Calculate average engagement time per active user (matches GA Engagement > Landing Page)
      // GA Engagement report uses userEngagementDuration / totalUsers
      const totalUsers = stats.breakdown.reduce(
        (sum, item) => sum + item.totalUsers,
        0
      );
      const totalUserEngagementDuration = stats.breakdown.reduce(
        (sum, item) => sum + item.userEngagementDuration,
        0
      );
      stats.totalStats.engagementTime =
        totalUsers > 0 ? totalUserEngagementDuration / totalUsers : 0;

      // Debug logging for engagement time calculation
      console.log('Engagement Time Calculation:', {
        totalUserEngagementDuration: totalUserEngagementDuration,
        totalUsers: totalUsers,
        calculatedEngagementTime: stats.totalStats.engagementTime,
        breakdownRows: stats.breakdown.length,
        sampleData: stats.breakdown.slice(0, 3).map((item) => ({
          sessions: item.sessions,
          users: item.totalUsers,
          userEngagementDuration: item.userEngagementDuration,
          calculatedPerUser:
            item.totalUsers > 0
              ? item.userEngagementDuration / item.totalUsers
              : 0,
        })),
      });

      // Calculate average bounce rate and session duration
      if (stats.breakdown.length > 0) {
        const totalBounceRate = stats.breakdown.reduce(
          (sum, item) => sum + item.bounceRate,
          0
        );
        const totalSessionDuration = stats.breakdown.reduce(
          (sum, item) => sum + item.averageSessionDuration,
          0
        );

        stats.totalStats.bounceRate = totalBounceRate / stats.breakdown.length;
        stats.totalStats.averageSessionDuration =
          totalSessionDuration / stats.breakdown.length;
      }
    }

    // Sort breakdown by sessions (highest first)
    stats.breakdown.sort((a, b) => b.sessions - a.sessions);

    res.status(200).json(stats);
  } catch (error) {
    console.error('Google Analytics API Error:', error);

    // Provide more specific error messages
    if (error.message?.includes('PERMISSION_DENIED')) {
      return res.status(403).json({
        error:
          'Permission denied. Please check that the service account has access to the Google Analytics property.',
      });
    }

    if (error.message?.includes('INVALID_ARGUMENT')) {
      return res.status(400).json({
        error:
          'Invalid request parameters. Please check the pagePath and date range.',
      });
    }

    res.status(500).json({
      error: 'Failed to fetch analytics data',
      details:
        process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
}
