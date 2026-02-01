import { useParams } from 'next/navigation';
import { Locale } from '@/i18n.config';

export const useCurrentLocale = (): Locale => {
    const params = useParams();
    return (params.locale as Locale) || 'en';
};
