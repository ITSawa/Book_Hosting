import React, { useEffect } from "react";

function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="info">
      <h2>About Us</h2>
      <div className="line"></div>
      <p>
        We are a company dedicated to providing hosting for books. We offer a user-friendly editor that allows you to write your book, add images, and easily manage your content. Our platform is designed with both writers and readers in mind, providing a seamless experience for publishing and enjoying digital books.
      </p>

      <div className="features">
        <h4>Our Features</h4>
        <ul>
          <li>
            <h4>Easy to Use Editor</h4>
            <p>
              Our editor is designed with simplicity in mind, making it easy for anyone to write and format their book. You can easily switch between different text styles, insert images, and manage chapters with just a few clicks.
            </p>
          </li>
          <li>
            <h4>Image Upload and Management</h4>
            <p>
              Add stunning images to enhance your book's visual appeal. Our image management tools make it easy to upload, resize, and organize your images. You can also add captions and alt text for accessibility.
            </p>
          </li>
          <li>
            <h4>Secure Hosting</h4>
            <p>
              Your book is safe and secure with our reliable hosting platform. We ensure data integrity and uptime for your content, so you can rest assured that your book is always accessible to readers.
            </p>
          </li>
          <li>
            <h4>Built-in Marketing Tools</h4>
            <p>
              Reach a wider audience with our built-in marketing tools. You can easily share your book on social media, embed it on your website, and track its performance with our analytics dashboard.
            </p>
          </li>
          <li>
            <h4>Multiple Publishing Options</h4>
            <p>
              Choose how you want to publish your book. You can choose to self-publish, submit it to our curated marketplace, or even partner with traditional publishers through our network.
            </p>
          </li>
        </ul>
      </div>

      <div className="call-to-action">
        <p>
          Ready to publish your masterpiece? Get started today with our easy-to-use platform!
        </p>
      </div>
    </div>
  );
}

export default React.memo(AboutUs);