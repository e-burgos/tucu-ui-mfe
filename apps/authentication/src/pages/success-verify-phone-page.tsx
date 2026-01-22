import SuccessCard from '../components/success-card';
import { SuccessVerifyPhoneMessage } from '../features/success-verify-phone/components/success-message';

const SuccessVerifyPhonePage = () => {
  return (
    <SuccessCard>
      <SuccessVerifyPhoneMessage />
    </SuccessCard>
  );
};

export default SuccessVerifyPhonePage;
