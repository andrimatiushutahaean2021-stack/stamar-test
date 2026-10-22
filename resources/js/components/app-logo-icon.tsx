import type { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon({
    className = '',
    alt = 'Logo BMKG',
    ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            src="/images/logo-bmkg.png"
            alt={alt}
            className={`object-contain ${className}`}
            {...props}
        />
    );
}
