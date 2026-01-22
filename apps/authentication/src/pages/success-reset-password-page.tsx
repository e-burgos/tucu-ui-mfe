import SuccessCard from '../components/success-card';
import { SuccessResetPasswordMessage } from '../features/success-reset-password/components/success-message';

const SuccessResetPasswordPage = () => {
  return (
    <SuccessCard>
      <SuccessResetPasswordMessage />
    </SuccessCard>
  );
};

export default SuccessResetPasswordPage;
