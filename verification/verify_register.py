from playwright.sync_api import Page, expect, sync_playwright

def verify_register_page(page: Page):
    print("Navigating to register page...")
    page.goto("http://localhost:3001/register")

    print("Waiting for form header...")
    # Be more specific or relax strictness
    expect(page.get_by_role("heading", name="Personal Details")).to_be_visible()

    print("Checking for Payment Receipt input...")
    expect(page.get_by_text("Upload Payment Receipt")).to_be_visible()

    print("Taking screenshot...")
    page.screenshot(path="verification/register_page.png", full_page=True)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_register_page(page)
            print("Verification successful!")
        except Exception as e:
            print(f"Verification failed: {e}")
        finally:
            browser.close()
