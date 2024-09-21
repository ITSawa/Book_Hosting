import React, { useEffect } from "react";

function Docs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="info">
      <h2>Documentation</h2>
      <div className="line"></div>

      <h3>Overview</h3>
      <p>
        Welcome to [Your Company Name]'s online book hosting service. Our platform allows you to create, edit, and manage your books with ease. Below is a brief overview of the features and functionalities available:
      </p>

      <h3>Features</h3>

      <h4>1. Create Books</h4>
      <p>
        - Users can create new books on the platform.
        - Each book can have multiple pages.
      </p>

      <h4>2. Edit Pages</h4>
      <p>
        - Pages within a book can be edited.
        - Users can add and format text, images, and other content.
      </p>

      <h4>3. Book Editor</h4>
      <p>
        - The book editor provides tools to modify the layout and content of your book.
        - You can add new chapters, sections, and multimedia elements.
      </p>

      <h4>4. Customize Styles</h4>
      <p>
        - Users can customize the styles of their books.
        - Change fonts, colors, and layout styles to match your preferences.
      </p>

      <h4>5. Site Customization</h4>
      <p>
        - Customize the appearance of your book's site page.
        - Modify the site's theme, add custom CSS, and adjust the layout.
      </p>

      <h3>Getting Started</h3>
      <p>
        To get started with our service, follow these simple steps:
      </p>
      <ol>
        <li><strong>Sign Up</strong>: Create an account on our platform.</li>
        <li><strong>Create a Book</strong>: Use the "Create Book" button to start a new book project.</li>
        <li><strong>Add Pages</strong>: Add pages to your book and start populating them with content.</li>
        <li><strong>Edit Content</strong>: Use the editor to format and arrange your content as needed.</li>
        <li><strong>Customize</strong>: Apply styles and customize your book's appearance to make it unique.</li>
      </ol>

      <h3>Contact Us</h3>
      <p>
        If you have any questions or need assistance, please contact our support team at [Your Email Address].
      </p>

      <p>Thank you for choosing [Your Company Name]'s online book hosting service!</p>
    </div>
  );
}

export default React.memo(Docs);