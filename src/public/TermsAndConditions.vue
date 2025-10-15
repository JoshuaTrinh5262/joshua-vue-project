<template>
    <main class="tc-container">
        <header class="tc-header">
            <h1>Terms & Conditions</h1>
            <p class="tc-meta">
                Last updated: <time :datetime="isoDate">{{ formattedDate }}</time>
            </p>
            <button class="tc-print" @click="printPage" disabled>Print / Save as PDF</button>
        </header>

        <section class="tc-intro">
            <p>
                These Terms and Conditions ("Terms") govern your access to and use of
                <strong>{{ siteName }}</strong> (the "Service"), operated by
                <strong>{{ companyName }}</strong> ("we", "us", or "our"). By
                accessing or using the Service, you agree to be bound by these Terms.
                If you do not agree, please do not use the Service.
            </p>
        </section>

        <section>
            <h2>1. Definitions</h2>
            <ul>
                <li><strong>Account</strong>: a unique account created for you to access the Service.</li>
                <li><strong>Content</strong>: text, images, or other material you upload, post, or otherwise make
                    available.</li>
                <li><strong>Service</strong>: the website, app, and related services provided by us.</li>
            </ul>
        </section>

        <section>
            <h2>2. Acceptance of Terms</h2>
            <p>
                Your access to and use of the Service is conditioned on your acceptance of and compliance with these
                Terms and any policies referenced herein, including our Privacy Policy.
            </p>
        </section>

        <section>
            <h2>3. Changes to Terms</h2>
            <p>
                We may modify these Terms at any time. We will post the updated Terms on this page and update the "Last
                updated" date above. Your continued use of the Service after changes become effective constitutes
                acceptance of the revised Terms.
            </p>
        </section>

        <section>
            <h2>4. Accounts</h2>
            <ul>
                <li>You must provide accurate, complete, and current information at all times.</li>
                <li>You are responsible for safeguarding your password and for any activities under your Account.</li>
                <li>You must notify us immediately of any breach of security or unauthorized use.</li>
            </ul>
        </section>

        <section>
            <h2>5. User Obligations</h2>
            <ul>
                <li>Comply with all applicable laws and these Terms.</li>
                <li>Provide truthful information and keep your Account details up to date.</li>
                <li>Respect the rights and privacy of others.</li>
            </ul>
        </section>

        <section>
            <h2>6. Prohibited Uses</h2>
            <p>You agree not to:</p>
            <ul>
                <li>Use the Service for unlawful purposes or to solicit others to perform or participate in unlawful
                    acts.</li>
                <li>Infringe upon or violate our intellectual property rights or the intellectual property rights of
                    others.</li>
                <li>Upload or transmit malware, viruses, or any destructive code.</li>
                <li>Attempt to gain unauthorized access to the Service or related systems.</li>
                <li>Scrape, harvest, or collect data without permission.</li>
            </ul>
        </section>

        <section>
            <h2>7. Intellectual Property</h2>
            <p>
                The Service and its original content, features, and functionality are and will remain the exclusive
                property of {{ companyName }} and its licensors. The Service is protected by copyright, trademark, and
                other laws.
            </p>
        </section>

        <section>
            <h2>8. User Content</h2>
            <ul>
                <li>You retain any rights you hold in Content you submit.</li>
                <li>By submitting Content, you grant us a worldwide, non-exclusive, royalty-free license to use,
                    reproduce, modify, and display such Content as necessary to operate and improve the Service.</li>
                <li>You represent and warrant that you have the rights to submit the Content and that it does not
                    violate any third-party rights or laws.</li>
            </ul>
        </section>

        <section v-if="paymentsEnabled">
            <h2>9. Purchases, Subscriptions & Billing</h2>
            <ul>
                <li>Prices, features, and billing cycles are described at checkout and may change with notice.</li>
                <li>Some fees may be non-refundable, except as required by law or our refund policy.</li>
                <li>You authorize us (and our payment processors) to charge your payment method for applicable fees and
                    taxes.</li>
            </ul>
        </section>

        <section>
            <h2>{{ paymentsEnabled ? '10' : '9' }}. Third-Party Services</h2>
            <p>
                Our Service may contain links to third-party websites or services that are not owned or controlled by
                us. We have no control over, and assume no responsibility for, their content, policies, or practices.
            </p>
        </section>

        <section>
            <h2>{{ paymentsEnabled ? '11' : '10' }}. Termination</h2>
            <p>
                We may suspend or terminate your access immediately, without prior notice or liability, for any reason,
                including if you breach these Terms. Upon termination, your right to use the Service ceases immediately.
            </p>
        </section>

        <section>
            <h2>{{ paymentsEnabled ? '12' : '11' }}. Disclaimers</h2>
            <ul>
                <li>The Service is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind.</li>
                <li>We do not warrant that the Service will be uninterrupted, secure, or error-free.</li>
                <li>Applicable consumer rights may provide you with additional protections; nothing in these Terms seeks
                    to limit non-waivable rights.</li>
            </ul>
        </section>

        <section>
            <h2>{{ paymentsEnabled ? '13' : '12' }}. Limitation of Liability</h2>
            <p>
                To the maximum extent permitted by law, in no event shall {{ companyName }}, its directors, employees,
                partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special,
                consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill,
                or other intangible losses.
            </p>
        </section>

        <section>
            <h2>{{ paymentsEnabled ? '14' : '13' }}. Indemnification</h2>
            <p>
                You agree to defend, indemnify and hold harmless {{ companyName }} and its affiliates from and against
                any claims, damages, obligations, losses, liabilities, costs or debt, and expenses arising from your use
                of the Service or breach of these Terms.
            </p>
        </section>

        <section>
            <h2>{{ paymentsEnabled ? '15' : '14' }}. Governing Law</h2>
            <p>
                These Terms shall be governed by and construed in accordance with the laws of {{ jurisdiction }},
                without regard to its conflict of law provisions.
            </p>
        </section>

        <section>
            <h2>{{ paymentsEnabled ? '16' : '15' }}. Dispute Resolution</h2>
            <p>
                Any disputes arising out of or relating to these Terms or the Service shall be resolved through
                good-faith negotiations. If unresolved, disputes shall be submitted to the courts located in {{ venue }}
                unless mandatory law provides otherwise.
            </p>
        </section>

        <section>
            <h2>{{ paymentsEnabled ? '17' : '16' }}. Severability & Waiver</h2>
            <ul>
                <li>If any provision is held to be unenforceable, the remaining provisions will remain in effect.</li>
                <li>Our failure to enforce any right or provision will not be considered a waiver of those rights.</li>
            </ul>
        </section>

        <section>
            <h2>{{ paymentsEnabled ? '18' : '17' }}. Entire Agreement</h2>
            <p>
                These Terms constitute the entire agreement between you and {{ companyName }} regarding the Service and
                supersede any prior agreements.
            </p>
        </section>

        <section>
            <h2>{{ paymentsEnabled ? '19' : '18' }}. Contact Us</h2>
            <p>
                If you have any questions about these Terms, please contact us at
                <a :href="`mailto:${contactEmail}`">{{ contactEmail }}</a>.
            </p>
        </section>

        <footer class="tc-footer">
            <p>
                <em>Disclaimer:</em> This template is provided for convenience only and does not constitute legal
                advice. Consider consulting a qualified attorney for guidance tailored to your situation.
            </p>
        </footer>
    </main>
</template>

<script setup>
import { computed } from 'vue'

// --- Props you can quickly customize ---
const props = defineProps({
    siteName: { type: String, default: 'Your Site' },
    companyName: { type: String, default: 'Your Company, Inc.' },
    jurisdiction: { type: String, default: 'your jurisdiction' },
    venue: { type: String, default: 'your venue/courts' },
    contactEmail: { type: String, default: 'support@example.com' },
    effectiveDate: { type: String, default: new Date().toISOString().substring(0, 10) }, // YYYY-MM-DD
    paymentsEnabled: { type: Boolean, default: false },
})

const siteName = computed(() => props.siteName)
const companyName = computed(() => props.companyName)
const jurisdiction = computed(() => props.jurisdiction)
const venue = computed(() => props.venue)
const contactEmail = computed(() => props.contactEmail)
const paymentsEnabled = computed(() => props.paymentsEnabled)

const isoDate = computed(() => props.effectiveDate)
const formattedDate = computed(() => {
    try {
        const d = new Date(props.effectiveDate)
        return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
    } catch {
        return props.effectiveDate
    }
})

function printPage() {
    window.print()
}
</script>

<style scoped>
.dark {
    .tc-container {
        color: #fff;
    }

    .tc-print {
        border: 1px solid #fff;
        color: #fff;
        padding: 0.5rem 0.9rem;
        border-radius: 0.5rem;
        cursor: pointer;
    }
}

.tc-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem 1rem 4rem;
}

.tc-header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1rem;
}

.tc-header h1 {
    margin: 0;
    font-size: 2rem;
}

.tc-meta {
    opacity: 0.8;
}

.tc-print {
    border: 1px solid currentColor;
    background: transparent;
    padding: 0.5rem 0.9rem;
    border-radius: 0.5rem;
    cursor: pointer;
}

section {
    margin: 1.25rem 0;
}

section h2 {
    font-size: 1.2rem;
    margin: 0 0 0.5rem;
}

section p,
section li {
    line-height: 1.6;
}

.tc-footer {
    margin-top: 2rem;
    font-size: 0.95rem;
    opacity: 0.85;
}

@media print {
    .tc-print {
        display: none;
    }

    .tc-header h1 {
        font-size: 1.5rem;
    }
}
</style>