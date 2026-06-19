import SelectDropdown from "../components/shared/SelectDropDown/SelectDropdown";

const CLASS_OPTIONS = ['1 to 3', '4 to 7', '8 to 10', '11 to 12'];
export default function SignupRoleFields({
  role,
  signupForm,
  onChange,
  isClassDropdownOpen,
  onClassDropdownToggle,
  onClassSelect,
  onClassDropdownClose,
  isTownDropdownOpen,
  onTownDropdownToggle,
  onTownSelect,
  onTownDropdownClose,
}) {
  if (role === 'student') {
    return (
      <>
        <label className="auth-page__field">
          Class / Grade
          <SelectDropdown
            value={signupForm.classLevel}
            options={CLASS_OPTIONS}
            placeholder="Select class"
            label="Class / Grade"
            isOpen={isClassDropdownOpen}
            onToggle={onClassDropdownToggle}
            onSelect={onClassSelect}
            onClose={onClassDropdownClose}
          />
        </label>
        <label className="auth-page__field">
          Student Image
          <label className="auth-page__upload">
            <input
              type="file"
              accept="image/*"
              className="auth-page__upload-input"
              onChange={onChange}
              name="profileImage"
            />
            <span className="auth-page__upload-copy">
              {signupForm.profileImage ? 'Image selected' : 'Upload image'}
            </span>
          </label>
        </label>
        <label className="auth-page__field auth-page__field--full">
          School Name
          <input
            type="text"
            name="schoolName"
            value={signupForm.schoolName}
            onChange={onChange}
            required
            className="auth-page__input"
          />
        </label>
      </>
    );
  }

  if (role === 'teacher') {
    return (
      <label className="auth-page__field">
        Experience (Years)
        <input
          type="text"
          name="experienceYears"
          value={signupForm.experienceYears}
          onChange={onChange}
          required
          className="auth-page__input"
        />
      </label>
    );
  }

  return (
    <label className="auth-page__field">
      Department / Access Area
      <input
        type="text"
        name="department"
        value={signupForm.department}
        onChange={onChange}
        required
        className="auth-page__input"
      />
    </label>
  );
}
