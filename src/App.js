import { useState } from 'react';
import Statistics from './components/Statistics';
import FeedbackOptions from './components/FeedbackOptions';
import Section from './components/Section';
import Notification from './components/Notification';

const App = () => {

  // state = {
  //   good: 0,
  //   neutral: 0,
  //   bad: 0,
  // };
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // incrementFeedback = stateName => {
  //   this.setState(prevState => ({
  //     [stateName]: prevState[stateName] + 1,
  //   }));
  // };
  const incrementFeedback = type => {
    switch (type) {
      case 'good':
        setGood(prevState => prevState + 1 );
        break;
      
      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;
      
      case 'bad':
        setBad(prevState => prevState + 1);
        break;
      
      default:
        return;
    }
  }

  // countTotalFeedback = () =>
  //   Object.values(this.state).reduce(
  //     (total, stateQuantity) => total + stateQuantity,
  //     0,
  //   );
  const countTotalFeedback = () => {
    return Object.values({ good, neutral, bad }).reduce(
      (acc, feedback) => acc + feedback,
      0,
    );
  };

  const countPositiveFeedbackPercentage = () =>
    countTotalFeedback()
      ? Math.round((good * 100) / countTotalFeedback())
      : 0;

      
  const options = ['good', 'neutral', 'bad'];
  

    return (
      <>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={options}
            onLeaveFeedback={incrementFeedback}
          />
        </Section>
        <Section title="Statistics">
          {countTotalFeedback() > 0 ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={countTotalFeedback()}
              positivePercentage={countPositiveFeedbackPercentage()}
            />
          ) : (
            <Notification message="No feedback given" />
          )}
        </Section>
      </>
    );
  }

export default App;
