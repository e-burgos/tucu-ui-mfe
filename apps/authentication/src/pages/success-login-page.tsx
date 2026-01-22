import SuccessCard from '../components/success-card';
import { SuccessLoginMessage } from '../features/success-login/components/success-message';

const SuccessLoginPage = () => {
  return (
    <SuccessCard>
      <SuccessLoginMessage />
    </SuccessCard>
  );
};

export default SuccessLoginPage;
