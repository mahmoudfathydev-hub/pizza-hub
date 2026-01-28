import { Pages, Routes } from '@/src/constants/enums';
import { Locale } from '@/src/i18n.config';
import { authOptions } from '@/src/server/auth'
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/dist/server/api-utils';

async function ProfilePage({ params }: { params: Promise<{ locale: Locale }> }) {
    const session = await getServerSession(authOptions);
    const { locale } = await params
    if (!session) {
        redirect(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`);
    }
    return (
        <main>
            test
        </main>
    )
}

export default ProfilePage