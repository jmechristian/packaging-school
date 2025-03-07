export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { company, title, id, linkedin, phone } = req.body;

    // if (!company || !title || !id) {
    //   return res.status(400).json({
    //     message: 'Missing required fields',
    //     received: req.body,
    //   });
    // }

    const customFields = [
      {
        value: company || '',
        custom_profile_field_definition_id: 1339,
      },
      {
        value: title || '',
        custom_profile_field_definition_id: 1340,
      },
    ];

    // Only add optional fields if they exist
    if (linkedin !== undefined) {
      customFields.push({
        value: linkedin || '',
        custom_profile_field_definition_id: 56972,
      });
    }

    if (phone !== undefined) {
      customFields.push({
        value: phone || '',
        custom_profile_field_definition_id: 2561,
      });
    }

    const response = await fetch(
      `https://api.thinkific.com/api/public/v1/users/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-API-Key': process.env.NEXT_THINKIFIC_API_KEY,
          'X-Auth-Subdomain': process.env.NEXT_THINKIFIC_SUBDOMAIN,
        },
        method: 'PUT',
        body: JSON.stringify({
          custom_profile_fields: customFields,
        }),
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({
        error: `Thinkific API error: ${response.status} ${response.statusText}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'User updated successfully',
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
