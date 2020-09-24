import React from 'react';

const Contact = props => {
  return (
    <div className="container text-center">
      <h1 className="mt-3">CONTACT</h1>
      <h2 className="my-5">
        If you have any suggestions or tips, feel free to shoot me an email!
      </h2>
      <h3>Basic information:</h3>
      <h5>Email: fredianig11@gmail.com</h5>
      <h5>Phone: +49-0176-47185252</h5>
      <h3 className="mt-5">Porfolio Website: </h3>
      <a
        href="https://gregfrediani.herokuapp.com"
        className="btn btn-outline-primary"
      >
        PORTFOLIO
      </a>
      <h3>All my code can be found here:</h3>
      <a href="https://github.com/gregxd11" className="btn btn-outline-success">
        GITHUB
      </a>
      <a
        href="https://github.com/gregxd11/react-blog"
        className="btn btn-outline-success"
      >
        CODE FOR THE WEBSITE
      </a>
    </div>
  );
};

export default Contact;
