import React from 'react';
import Swal from 'sweetalert2';


function Contact() {


  const handleSendFeedback = () => {
    Swal.fire({
      icon: 'success',
      title: 'Message send successfully',
      text: 'Your message sent successfully. Please check back later.',
      confirmButtonText: 'Okay',
      confirmButtonColor: '#F59E0B', // Matches Tailwind's yellow-600
    });
  };
  
  return (
    <section className="text-text-light bg-background body-font relative container mx-auto my-10">
    <div className="absolute inset-0 bg-background">
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        title="map"
        scrolling="no"
        src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=%C4%B0zmir+(My%20Business%20Name)&ie=UTF8&t=&z=14&iwloc=B&output=embed"
        style={{ filter: 'grayscale(.71) contrast(1.2) opacity(0.7)' }}
      ></iframe>
    </div>
    <div className="container px-5 py-24 mx-auto flex">
      <div className="lg:w-1/3 md:w-1/2 bg-cardback rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative shadow-md">
        <h2 className="text-text-primary text-lg mb-1 font-medium title-font font-sans">Feedback</h2>
        <p className="leading-relaxed mb-5 text-text-secondary font-mono">
          We value your feedback! Please feel free to drop us a message for any queries, suggestions, or comments.
        </p>
        <div className="relative mb-4">
          <label htmlFor="email" className="leading-7 text-sm text-text-light">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full bg-cardback rounded border border-border focus:border-text-primary focus:ring-2 focus:ring-text-primary text-base outline-none text-text-primary py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="relative mb-4">
          <label htmlFor="message" className="leading-7 text-sm text-text-primary">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className="w-full bg-cardback rounded border border-border focus:border-text-primary focus:ring-2 focus:ring-text-primary h-32 text-base outline-none text-text-primary py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
          ></textarea>
        </div>
        <button
          onClick={handleSendFeedback}
          className="text-cardback bg-text-primary border-0 py-2 px-6 focus:outline-none hover:bg-text-secondary rounded text-lg"
        >
          Send Feedback
        </button>
        <p className="text-xs text-text-secondary mt-3 font-mono">
          Your feedback helps us improve our service. Thank you!
        </p>
      </div>
    </div>
  </section>
  
  );
}

export default Contact;