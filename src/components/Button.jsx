import Link from 'next/link';

export default function Button({
  children,
  href,
  to,
  variant = 'primary',
  className = '',
  ...props
}) {
  const styles = ['button', `button--${variant}`, className].filter(Boolean).join(' ');

  if (to) {
    return (
      <Link href={to} className={styles} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={styles} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
}
