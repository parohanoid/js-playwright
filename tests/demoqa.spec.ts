import { test, expect } from '@playwright/test';
import path from 'path';

// locators
// locator('#frame2').contentFrame().getByRole('heading', { name: 'This is a sample page' })

test('test', async ({ page }) => {
    await page.goto('https://demoqa.com/');
    await page.getByRole('heading', { name: 'Forms' }).click();
    await page.getByText('Alerts, Frame & Windows').click();
    await page.getByText('Browser Windows').click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('button', { name: 'New Window', exact: true }).click();
    const page1 = await page1Promise;
    await expect(page1.locator('#sampleHeading')).toContainText('This is a sample page');
    await page1.close();
    const page3Promise = page.waitForEvent('popup');
    await page.getByRole('button', { name: 'New Window Message' }).click();
    const page3 = await page3Promise;
    await expect(page3.locator('body')).toContainText('Knowledge increases by sharing but not by saving. Please share this website with your friends and in your organization.');
    await page3.close();
    const page4Promise = page.waitForEvent('popup');
    await page.getByRole('button', { name: 'New Tab' }).click();
    const page4 = await page4Promise;
    await expect(page4.locator('#sampleHeading')).toContainText('This is a sample page');
    await page4.close();
    await page.getByRole('listitem').filter({ hasText: /^Frames$/ }).click();
    await expect(page.locator('#frame1').contentFrame().locator('#sampleHeading')).toContainText('This is a sample page');
    await page.getByRole('listitem').filter({ hasText: 'Nested Frames' }).click();
    await expect(page.locator('#frame1').contentFrame().locator('iframe').contentFrame().getByRole('paragraph')).toContainText('Child Iframe');

    await page.getByText('Widgets').click();
    await page.getByRole('listitem').filter({ hasText: 'Tabs' }).click();
    await page.getByRole('tab', { name: 'Use' }).click();
    await expect(page.getByRole('paragraph')).toContainText('It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).');
    await page.getByRole('listitem').filter({ hasText: 'Slider' }).click();
    await page.getByRole('slider').fill('33');
    await expect(page.locator('#sliderValue')).toHaveValue('33');
    await page.getByRole('listitem').filter({ hasText: 'Accordian' }).click();
    await page.getByText('Where does it come from?').click();
    await expect(page.locator('#section2Content')).toContainText('Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.');
    
    await page.getByText('Forms').click();
    await page.getByRole('listitem').filter({ hasText: 'Practice Form' }).click();
    
    await page.getByRole('textbox', { name: 'First Name' }).fill('Rohan');
    
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Panchal');
    
    await page.getByRole('textbox', { name: 'name@example.com' }).fill('hello@45');
    
    
    await page.getByRole('textbox', { name: 'name@example.com' }).fill('hello@45.com');
    
    
    await page.getByText('Male', { exact: true }).click();
    
    
    await page.getByRole('textbox', { name: 'Mobile Number' }).fill('3274687236');
    await page.getByRole('textbox', { name: 'Mobile Number' }).press('Tab');

    await page.locator('#dateOfBirthInput').fill('16/02/2025');
    await page.locator('#subjectsInput').fill('test');
    await page.locator('#subjectsInput').press('Tab');

    await page.getByText('Reading').check();
    await page.getByRole('button', { name: 'Select picture' }).setInputFiles(path.join(__dirname, "../sample.txt"));
    await page.getByRole('textbox', { name: 'Current Address' }).fill('test5256');
    await page.locator('#state svg').click();
    await page.getByText('Uttar Pradesh', { exact: true }).click();
    await page.locator('#city svg').click();
    await page.getByText('Lucknow', { exact: true }).click();
    await page.getByRole('button', { name: 'Submit' }).click();



    await expect(page.locator('tbody')).toContainText('Rohan Panchal');
    await expect(page.locator('tbody')).toContainText('Male');
    await expect(page.locator('tbody')).toContainText('hello@45.com');
    await expect(page.locator('tbody')).toContainText('3274687236');
    await expect(page.locator('tbody')).toContainText('15 July,2025');

    page.evaluate("document.body.style.zoom=0.60");
    page.evaluate("document.body.style.transform = 'scale(0.60)'");
    await page.getByRole('button', { name: 'Close' }).click();
});