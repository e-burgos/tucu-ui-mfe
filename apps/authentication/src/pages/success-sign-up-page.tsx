import SuccessCard from '../components/success-card';
import { SuccessSignUpMessage } from '../features/success-sign-up/components/success-message';

const SuccessSignUpPage = () => {
  return (
    <SuccessCard>
      <SuccessSignUpMessage />
    </SuccessCard>
  );
};

export default SuccessSignUpPage;
