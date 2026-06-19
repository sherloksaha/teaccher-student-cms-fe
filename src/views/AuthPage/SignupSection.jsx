import { BriefcaseBusiness, Eye, EyeOff } from "lucide-react";
import Button from "../../components/Button";
import SelectDropdown from "../../components/shared/SelectDropDown/SelectDropdown";
import SignupRoleFields from "../SignupRoleFields";

export default function SignupSection({
  roleOptions,
  signupForm,
  currentRoleContent,
  isSignupSubmitting,
  isSignupPasswordVisible,
  isClassDropdownOpen,
  isTownDropdownOpen,
  isAreaDropdownOpen,
  townOptions,
  areaOptions,
  isTownsLoading,
  isAreasLoading,
  onSubmit,
  onChange,
  onRoleChange,
  onSignupPasswordToggle,
  onClassDropdownToggle,
  onClassDropdownClose,
  onClassSelect,
  onTownDropdownToggle,
  onTownDropdownClose,
  onTownSelect,
  onAreaDropdownToggle,
  onAreaDropdownClose,
  onAreaSelect,
}) {
  return (
    <>
      <form className="auth-page__form" onSubmit={onSubmit}>
        <div className="auth-page__role-switcher">
          {roleOptions.map((role) => (
            <button
              key={role.value}
              type="button"
              className={`auth-page__role-chip${signupForm.role === role.value ? " auth-page__role-chip--active" : ""}`}
              onClick={() => onRoleChange(role.value)}
            >
              {role.label}
            </button>
          ))}
        </div>

        <div className="auth-page__form-grid">
          <label className="auth-page__field">
            {signupForm.role === "super-user"
              ? "Super User Name"
              : signupForm.role === "teacher"
                ? "Teacher Name"
                : "Student Name"}
            <input
              type="text"
              name="name"
              value={signupForm.name}
              onChange={onChange}
              required
              className="auth-page__input"
            />
          </label>
          <label className="auth-page__field">
            Email
            <input
              type="email"
              name="email"
              value={signupForm.email}
              onChange={onChange}
              required
              className="auth-page__input"
            />
          </label>
          <label className="auth-page__field">
            Password
            <div className="auth-page__password-field">
              <input
                type={isSignupPasswordVisible ? "text" : "password"}
                name="password"
                value={signupForm.password}
                onChange={onChange}
                required
                className="auth-page__input auth-page__input--password"
              />
              <button
                type="button"
                className="auth-page__password-toggle"
                onClick={onSignupPasswordToggle}
                aria-label={
                  isSignupPasswordVisible ? "Hide password" : "Show password"
                }
                aria-pressed={isSignupPasswordVisible}
              >
                {isSignupPasswordVisible ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </label>
          <label className="auth-page__field">
            Phone Number
            <div className="auth-page__phone-field">
              <span className="auth-page__phone-prefix">+91</span>
              <input
                type="tel"
                name="phone"
                value={signupForm.phone}
                onChange={onChange}
                required
                inputMode="numeric"
                maxLength={10}
                minLength={10}
                pattern="[0-9]{10}"
                placeholder="9876543210"
                className="auth-page__input auth-page__input--phone"
              />
            </div>
          </label>
          <label className="auth-page__field">
            Town
            <SelectDropdown
              value={signupForm.town}
              options={townOptions}
              placeholder={isTownsLoading ? "Loading towns..." : "Select town"}
              label="Town"
              isOpen={isTownDropdownOpen}
              onToggle={onTownDropdownToggle}
              onSelect={onTownSelect}
              onClose={onTownDropdownClose}
            />
          </label>
          <label className="auth-page__field">
            Area
            <SelectDropdown
              value={signupForm.area}
              options={areaOptions}
              placeholder={
                signupForm.town
                  ? isAreasLoading
                    ? "Loading areas..."
                    : "Select area"
                  : "Select town first"
              }
              label="Area"
              isOpen={isAreaDropdownOpen}
              onToggle={onAreaDropdownToggle}
              onSelect={onAreaSelect}
              onClose={onAreaDropdownClose}
            />
          </label>
          <label className="auth-page__field">
            Pincode
            <input
              type="text"
              name="pincode"
              value={signupForm.pincode}
              onChange={onChange}
              inputMode="numeric"
              maxLength={6}
              placeholder="700001"
              className="auth-page__input"
            />
          </label>
          <SignupRoleFields
            role={signupForm.role}
            signupForm={signupForm}
            onChange={onChange}
            isClassDropdownOpen={isClassDropdownOpen}
            onClassDropdownToggle={onClassDropdownToggle}
            onClassDropdownClose={onClassDropdownClose}
            onClassSelect={onClassSelect}
            isTownDropdownOpen={isTownDropdownOpen}
            onTownDropdownToggle={onTownDropdownToggle}
            onTownDropdownClose={onTownDropdownClose}
            onTownSelect={onTownSelect}
          />
        </div>

        <div className="auth-page__admin-note">
          <BriefcaseBusiness />
          <p>
            After signup, each user can log in and move directly to the
            dashboard.
          </p>
        </div>

        <Button
          type="submit"
          className="button--full-width auth-page__submit"
          disabled={isSignupSubmitting}
        >
          {isSignupSubmitting
            ? "Creating Account..."
            : currentRoleContent.signupTitle}
        </Button>
      </form>
    </>
  );
}
