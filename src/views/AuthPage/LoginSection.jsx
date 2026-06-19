import { Eye, EyeOff } from "lucide-react";
import Button from "../../components/Button";

export default function LoginSection({
  loginForm,
  isLoginPasswordVisible,
  onSubmit,
  onChange,
  onLoginPasswordToggle,
}) {
  return (
    <>
      <form className="auth-page__form" onSubmit={onSubmit}>
        <label className="auth-page__field">
          Email
          <input
            type="email"
            name="email"
            value={loginForm.email}
            onChange={onChange}
            required
            className="auth-page__input"
          />
        </label>

        <label className="auth-page__field">
          Password
          <div className="auth-page__password-field">
            <input
            type={isLoginPasswordVisible ? "text" : "password"}
            name="password"
            value={loginForm.password}
            onChange={onChange}
            required
            className="auth-page__input auth-page__input--password"
          />
          <button
            type="button"
            className="auth-page__password-toggle"
            onClick={onLoginPasswordToggle}
            aria-label={
              isLoginPasswordVisible ? "Hide password" : "Show password"
            }
              aria-pressed={isLoginPasswordVisible}
            >
              {isLoginPasswordVisible ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </label>

        <Button type="submit" className="button--full-width auth-page__submit">
          Log In
        </Button>
      </form>
    </>
  );
}
