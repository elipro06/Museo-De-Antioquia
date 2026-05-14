import { Link } from 'react-router-dom';

import styles from './Button.module.css';

export const Button = ({
  children,
  variant = 'primary',
  onClick,
  href,
  className = '',
  type = 'button',
  ariaLabel,
  target,
  rel,
}) => {
  const resolvedClassName = className && styles[className] ? styles[className] : className;
  const btnClass = [styles.btn, styles[variant] || '', resolvedClassName].filter(Boolean).join(' ');

  if (href) {
    // Si es navegación interna (relativa), usa <Link>
    const isInternal = href && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('tel:');
    if (isInternal) {
      return <Link to={href} className={btnClass} aria-label={ariaLabel}>{children}</Link>;
    }

    const isExternal = href.startsWith('http');
    const linkRel = rel || (isExternal ? 'noopener noreferrer' : undefined);

    return <a href={href} className={btnClass} aria-label={ariaLabel} target={target} rel={linkRel}>{children}</a>;
  }

  return (
    <button type={type} onClick={onClick} className={btnClass} aria-label={ariaLabel}>
      {children}
    </button>
  );
};