import { isCheckoutIntentUrl } from './checkoutIntent';

// Guard for the ab_purchase_intent classification. Run with any Jest-compatible
// runner. These cases mirror the production breakdown that surfaced the bug:
// enrolled students opening owned courses and account nav were being counted as
// "checkout started".

describe('isCheckoutIntentUrl', () => {
  it('treats /enroll/ destinations as checkout intent', () => {
    expect(
      isCheckoutIntentUrl('https://learn.packagingschool.com/enroll/123'),
    ).toBe(true);
    expect(
      isCheckoutIntentUrl(
        'https://learn.packagingschool.com/enroll/123?price_id=456',
      ),
    ).toBe(true);
    expect(isCheckoutIntentUrl('/enroll/789?coupon=SUMMER')).toBe(true);
  });

  it('treats cart/checkout and price_id paths as checkout intent', () => {
    expect(isCheckoutIntentUrl('https://learn.packagingschool.com/cart')).toBe(
      true,
    );
    expect(
      isCheckoutIntentUrl('https://learn.packagingschool.com/checkout'),
    ).toBe(true);
    expect(isCheckoutIntentUrl('/something?price_id=42')).toBe(true);
  });

  it('does NOT treat owned-course access as intent', () => {
    expect(
      isCheckoutIntentUrl(
        'https://learn.packagingschool.com/courses/take/packaging-boot-camp-101',
      ),
    ).toBe(false);
  });

  it('does NOT treat account/billing/certificate nav as intent', () => {
    expect(
      isCheckoutIntentUrl('https://learn.packagingschool.com/account/certificates'),
    ).toBe(false);
    expect(
      isCheckoutIntentUrl('https://learn.packagingschool.com/account/billing'),
    ).toBe(false);
  });

  it('excludes free-trial starts from paid intent', () => {
    expect(
      isCheckoutIntentUrl(
        'https://learn.packagingschool.com/enroll/123?et=free_trial',
      ),
    ).toBe(false);
  });

  it('does NOT treat a bare LMS link as intent', () => {
    expect(isCheckoutIntentUrl('https://learn.packagingschool.com')).toBe(false);
    expect(isCheckoutIntentUrl('')).toBe(false);
    expect(isCheckoutIntentUrl(null)).toBe(false);
  });
});
