import React from 'react';
import './Repositories.scss';

const Repositories = ({ repo }:any) =>
  // const repositorie = repo;
  // console.log('repo', repo);
  // eslint-disable-next-line implicit-arrow-linebreak
  (
    <>
      {repo.map((item) => (
        <div className="repos-item" key={item.name}>
          <p><a href={item.html_url}>{item.name}</a></p>
          <div>
            <p>{item.forks}<img
              src="https://img.icons8.com/material-outlined/24/000000/star--v2.png"
              alt="star"
            />
            </p>
            <p>{item.stargazers_count}<img
              src="https://img.icons8.com/material-sharp/24/000000/code-fork.png"
              alt="fork"
            />
            </p>
          </div>
        </div>
      ))}
    </>

  );
export default Repositories;
