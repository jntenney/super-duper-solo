import { Container, Card, Accordion } from 'react-bootstrap';

const Hero = () => {
  return (
    <>
      <div className=" py-5">
        <Container className="d-flex justify-content-center mb-5">
          <Card className="p-5 d-flex flex-column align-items-left hero-card bg-light w-100">
            <h1 className="text-center mb-4">Super Duper Solo Project</h1>
            <p className="mb-4">
              This project is an exploration of various frontend and backend technologies which are used to build a REST
              based user authentication service, user profile service and user session management service. JSON Web
              Tokens and HttpOnly cookies are used to ensure each user can only access and edit their own data.
            </p>
            <p>
              <strong>Frontend Technologies: </strong>
              <a href="https://vitejs.dev/">Vite</a>, <a href="https://react.dev/">React</a>,{' '}
              <a href="https://reactrouter.com/en/main">React Router</a>,{' '}
              <a href="https://redux-toolkit.js.org/">Redux Toolkit</a>,{' '}
              <a href="https://react-bootstrap.netlify.app/">React Bootstrap</a>,{' '}
              <a href="https://www.npmjs.com/package/react-toastify">React Toastify</a>.
            </p>
            <p>
              <strong>Backend Technologies: </strong>
              <a href="https://www.mongodb.com/">MongoDB</a>, <a href="https://expressjs.com/">Express</a>,{' '}
              <a href="https://mongoosejs.com/">mongoose</a>,{' '}
              <a href="https://www.npmjs.com/package/jsonwebtoken">JSON Web Tokens</a>,{' '}
              <a href="https://www.npmjs.com/package/bcrypt">bcrypt</a>,{' '}
              <a href="https://www.npmjs.com/package/cookie-parser">cookie-parser</a>,{' '}
              <a href="https://www.npmjs.com/package/dotenv">dotenv</a>,{' '}
              <a href="https://www.npmjs.com/package/colors">colors</a>.
            </p>
          </Card>
        </Container>
        <Container className="d-flex justify-content-center mb-5">
          <Card className="p-5 d-flex flex-column align-items-left hero-card bg-light w-100">
            <h1 className="text-center mb-4">Backend Learnings and Challenges</h1>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Express Error Handling</Accordion.Header>
                <Accordion.Body>
                  Started including stack trace in global error handler when environment <strong>was not</strong> set to{' '}
                  <strong>production</strong>. Helpful to debug REST API calls from client to server. Enabled me to see
                  server stack trace in the browser console.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Mongoose</Accordion.Header>
                <Accordion.Body>
                  When sending cart data from server to client plain old JavaScript objects were desirable. Otherwise,
                  Mongoose will use a binary format, particularly for _ids and Arrays, which gave weird results in the
                  browser. Learned the difference between <strong>MyModel.findOne();</strong> and{' '}
                  <strong>MyModel.findOne().lean();</strong>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>MongoDB</Accordion.Header>
                <Accordion.Body>
                  Ended up importing{' '}
                  <a href="https://www.kaggle.com/datasets/asaniczka/amazon-products-dataset-2023-1-4m-products">
                    Amazon Products Dataset 2023 (1.4M Products)
                  </a>{' '}
                  as products to browse for cart system. Built an index on product ID and ASIN. Surprised that queires
                  based on product ID and ASIN were super fast. MongoDB is a deep topic with many options for tuning and
                  configuring.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>dotenv</Accordion.Header>
                <Accordion.Body>
                  Used <strong>dotenv</strong> to manage data configurable environment variable. This made it easy to
                  change{' '}
                  <span style={{ color: 'darkred' }}>NODE_ENV, PORT, MONGO_URI, SALT_WORK_FACTOR, JWT_SECRET</span>{' '}
                  settings quickly.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4">
                <Accordion.Header>User Cart system</Accordion.Header>
                <Accordion.Body>
                  Actually implementing a full-on CRUD capable Cart for users is quite complex and time consuming.
                  Skipped it as a stretch goal.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Card>
        </Container>
        <Container className="d-flex justify-content-center mb-5">
          <Card className="p-5 d-flex flex-column align-items-left hero-card bg-light w-100">
            <h1 className="text-center mb-4">Frontend Learnings and Challenges</h1>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Vite</Accordion.Header>
                <Accordion.Body>
                  Easy to use, easy to configure. Only Vite item that required configuration for the project was the
                  Vite proxy.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>React Bootstrap Components</Accordion.Header>
                <Accordion.Body>
                  While the site may look very bootstrapy, the bootstrap components are easy to use and very well
                  documented. Really great for prototyping applications. In the end, using them saved a lot of time.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>React Router</Accordion.Header>
                <Accordion.Body>
                  Useful for hiding the protected routes on the client from the user. Even though the user could type in{' '}
                  <strong>http://localhost:3000/profile</strong> the user had to login before the route was valid client
                  side. Basically, the protected routes were enforced client side (using React Router) and server side
                  (using JWT HttpOnly session cookie).
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>Redux Toolkit</Accordion.Header>
                <Accordion.Body>
                  Used Redux Toolkit, but mainly used it for the RTK Query capabilities. This allowed for easy
                  configuration of web service call from client to the server. Basically enable me to describe to RTK
                  Query what the server side API was expecting (URL, HTTP Method, Body Data) and RTK Query synthesized
                  the appropriate React hooks to call the client. It even handled states like isLoading, isFetching,
                  isError. There was a learning curve to RTK Query but I didn&apos;t have to hand write the
                  client-to-server side queries.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Card>
        </Container>{' '}
      </div>
    </>
  );
};

export default Hero;
