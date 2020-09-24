import React from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// import Post from '../components/Post';

const HomeContainer = props => {
  return (
    <main className="container">
      <section className="text-center mt-3">
        <h1>Self Taught Web Development Journey</h1>
      </section>
      <section className="card mt-3">
        <article className="card-body">
          <h3 className="">What is this?</h3>
          <p>
            This blogging site is basically a journal for a self-taught
            developer. The plan is for posts to state what was learned for the
            day or what tasks were accomplished on different projects and
            occassionally other non-learning related things. Its other purpose
            is to serve as a place to look back and reflect on how much progress
            has been made in developing more knowledge of web technologies. This
            blog in itself will be part of the learning process through more
            features being added, improved styling (which will be the last thing
            as it's mostly focusing on React first!), and cleaner code.
          </p>
          <br />
        </article>
      </section>
    </main>
  );
};

export default HomeContainer;
