
const About = () => {
  return (
    <section id="about" className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Meet the Team
        </h2>
        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-lg p-8 border border-border">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-48 h-48 rounded-full bg-muted overflow-hidden">
                <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary">
                  {/* Placeholder for profile photo */}
                  <span className="text-lg font-medium">KV</span>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-semibold mb-4">Krishna</h3>
                <p className="text-muted-foreground mb-4">
                  An AI strategist and product leader with 9+ years of experience scaling products and teams at BYJU'S, a global EdTech leader. I've built and launched products across 6 countries, scaled teams from 45 to 300+ members, and consistently cut development time by 70% using AI.
                </p>
                <p className="text-muted-foreground">
                  Now, I'm applying that expertise to help small businesses like yours harness the power of AI and automation. Whether you're looking to build an MVP, streamline your workflows, or develop a winning content strategy, I'm here to guide you every step of the way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
