import AboutHero from "./_components/about-hero"
import AboutValues from "./_components/about-values"
import AboutTeam from "./_components/about-team"
import AboutNewsletter from "./_components/about-newsletter"

const AboutPage = () => {
    return (
        <main className="min-h-screen bg-background">
            <AboutHero />
            <AboutValues />
            <AboutTeam />
            <AboutNewsletter />
        </main>
    )
}

export default AboutPage
