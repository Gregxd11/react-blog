import React from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// import Post from '../components/Post';

const HomeContainer = props => {
  return (
    <main className="ui container center aligned">
      <section className="ui massive header">
        <h1>Self Taught Web Development Journey</h1>
      </section>
      <section className="ui piled segment">
        <article>
          <h3 className="ui big header">What is this?</h3>
          <p>
            This blogging site is where the journey of self learning will
            unfold. The plan is for posts to state what was learned for the day
            or what tasks were accomplished on different projects. Its other
            purpose is to serve as a place to look back and reflect on how much
            progress has been made in developing more knowledge of web
            technologies. This blog in itself will be part of the learning
            process through more features being added, improved styling, and
            cleaner code.
          </p>
        </article>
      </section>
    </main>
  );
};

export default HomeContainer;
