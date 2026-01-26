import ContactHero from "./_components/contact-hero"
import ContactInfo from "./_components/contact-info"
import ContactBranches from "./_components/contact-branches"
import ContactNewsletter from "./_components/contact-newsletter"

const ContactPage = () => {
    return (
        <main className="min-h-screen bg-white">
            <ContactHero />
            <ContactInfo />
            <ContactBranches />
            <ContactNewsletter />
        </main>
    )
}

export default ContactPage
