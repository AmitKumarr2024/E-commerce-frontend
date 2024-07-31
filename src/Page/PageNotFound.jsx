import React from 'react';

function PageNotFound(props) {
    return (
        <div>
          <h1>Page Not Found</h1>
          <p>Looks like you've followed a broken link or entered a URL that doesn't exist on this site.</p>
          <a href="/">Back to our site</a>
        </div>
      );
}

export default PageNotFound;