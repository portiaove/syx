import Link from 'next/link';

interface CTAButtonProps {
  href: string;
  label: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'cta';
}

export default function CTAButton({ 
  href, 
  label, 
  className = '', 
  variant = 'primary' 
}: CTAButtonProps) {
  const baseClasses = "inline-block px-6 py-3 text-sm font-medium rounded transition-colors";
  
  const variantClasses = {
    primary: "bg-primary text-white hover:bg-gray-800",
    secondary: "bg-white text-primary border border-primary hover:bg-gray-50",
    cta: "bg-cta text-primary hover:bg-yellow-600"
  };

  return (
    <Link 
      href={href} 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {label}
    </Link>
  );
}