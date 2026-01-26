import AboutHero from "./_components/about-hero"
import AboutValues from "./_components/about-values"
import AboutTeam from "./_components/about-team"

const AboutPage = () => {
    return (
        <main className="min-h-screen bg-background">
            <AboutHero />
            <AboutValues />
            <AboutTeam />
        </main>
    )
}

export default AboutPage
