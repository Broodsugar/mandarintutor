# Welcome to Auki Labs!

Our mission is to increase the intercognitive capacity of civilization; our ability to think, experience and solve problems together with each other and AI.

To that end, we are building the real world web: a protocol that makes the physical world browsable, searchable and navigable to AI. This will allow us rich experiences like shared augmented reality overlays that let us manifest our knowledge and imagination with higher fidelity in the minds of others, as well as new ways to work together with AI, robots and each other in the physical world.

**Vision**: Shared understanding.
**Mission**: Increase civilization's intercognitive capacity.
**Strategy**: Build the real world web (the internet of spaces, sensors and actuators) to enable shared augmented reality, collaborative robotics, and human-AI interfaces.
**Tactics**: Build the real world web from the ground up, starting with retail. Decentralized and collaborative. Aligned incentives. 

If Amazon's mission is to reduce the friction of commerce,
and Apple's mission is to reduce the friction of creativity,
then Auki's mission is to reduce the friction of shared understanding and collaboration.

# The Real World Web

The real world web is a decentralized network that makes physical space a shared computational layer. Just as the internet made information browsable, the real world web makes physical locations browsable, searchable, and navigable to AI, robots, and humans.

The network is built around one core concept: the **Domain**. A Domain is a spatial unit — a room, a warehouse, a street corner — privately owned, independently operated, and linked to other Domains via shared protocols. Each Domain has its own coordinate system, its own clock, and its own map. There is no global coordinate system. No single authority sees everything. Domains are sovereign, and transforms are the bridges between them.

The protocol exists to let any node answer four questions about any other node:

- **Where is this?**
- **When was this?**
- **How can I talk to you?**
- **How can I compensate you?**

## A note on decentralization

Just like each website on the internet is centrally hosted by someone somewhere, every domain on the real world web is centrally controlled and hosted by its operator. The real world web is polycentrically decentralized - a network of self-sovereign entities forming a larger collaborative whole.

In the real world web, the word "decentralization" means that there is no central entity building and maintaining a map of the whole world, rather, there is a protocol for moving between self-hosted domains.

## Why the Network Needs an Economy

The real world web can't be run by a single company. No one organization can map every room, run every relay, or process every sensor stream on the planet. The network has to be built and operated by many independent participants — people, businesses, and machines — each contributing compute, storage, sensors, or spatial data.

But why would anyone contribute? If you run a Map node that serves landmark data to visitors, or a Relay node that carries pose data between peers, that costs you real resources: electricity, bandwidth, hardware. Without compensation, rational actors won't participate, and the network stays empty. Robots don't watch ads, so the real world web needs to monetize with a different model.

We need a way for nodes to pay each other for services. And we need that payment system to work without a central authority, because the network itself is decentralized. No bank, no payment processor — just nodes exchanging value directly.

That's the problem. Now, the solution.

### Credits: the currency of the network

**Credits** are the currency of the network — the answer to that fourth question: *"How can I compensate you?"* You spend credits to use services, and you earn credits by providing them. 1 credit = 1 dollar of value, always.

### $AUKI: the token behind the credits

You get credits by performing services in the network, or by burning dollar-denominated amounts $AUKI tokens. A ten dollar burn always gives you 10 dollars worth of credits, but also populates a reward pool that network participants can redeem in exchange for their credits.

The $AUKI token is the onramp and offramp into the network economy, and its deflationary design means that increased demand for the network leads to reduced supply of tokens, which should make the $AUKI token increase in value together with the value of the network itself.

As such, network participants can always choose to keep their credits for consuming services on the network, or redeeming their credits for the $AUKI token, which is in turn exchangable for other currencies on exchanges.


### Staking: skin in the game

If you want to **provide services** on the network (not just consume them), you need to **stake** $AUKI tokens. Staking is a deposit that says "I'm committed to doing good work here." The more you stake, the more trustworthy you appear to potential recruiters.

If you fail to show up or do a bad job your stake can be **slashed** (partially taken away). This protects the people relying on your services.

### How Auki Labs sustains itself

Auki Labs earns a small transaction fee on all credit transfers. This funds continued development and maintenance of the protocol. We also hold a large treasury of $AUKI tokens, which incentivizes us to accelerate adoption of the network.

## Products

| Product | Description |
|---------|-------------|
| **The Real World Web** | The posemesh protocol itself and the decentralized spatial computing network it runs on |
| **Cactus** | AI copilot for the retail industry (see below) |

### Cactus

Retail stores are blind. They have cameras, handhelds, inventory systems, and task lists — but none of them talk to each other, and none of them actually know where anything is. Staff spend their day walking, searching, guessing, and handing off context through meetings that shouldn't exist. The data needed to run a store well is trapped in the heads of whoever is on shift. When they clock out, it walks out with them.

Cactus fixes this by turning a store into a live, shared 3D map that makes the physical space accessible to AI. Staff scan shelves with their phones. Cactus maps products, tasks, and positions into one shared truth.

Setup: place QR codes for spatial anchoring, walk the space with any iOS or Android device to create the map, scan product barcodes to register inventory. Self-deployed in under 24 hours. Self-hosted on the customer's cloud — their data stays private.

**Features today:** 3D heatmaps of sales performance based on true product locations, navigation assistance for staff (exposable to shoppers without app downloads), and an augmented reality task manager that ties tasks to locations instead of lists.

**Proof:** Stora COOP Visby — 5,000 sqm, 24,000+ SKUs, dozens of employees. Pilot results: up to 45 minutes saved per employee per day, one daily recurring meeting eliminated in the first month. Staff with cognitive impairments saw the largest performance gains — spatial instructions are clearer than written task lists.

> "Now everything runs perfectly. All the tasks get completed, and they get done correctly." — Team Leader, Stora COOP Visby

## Our Strategy

Start with perception. Collapse deployment cost. Capture territory. Enable co-embodiment.

Most robotics companies are trying to perfect manipulation and locomotion before they deploy. That forces them to overcome a brutal reliability cliff before they can scale.

We believe that's a strategic error.

Robots can be said to have capabilities that roughly map into three categories:
Locomotion — traversing environments, typically to carry a payload.
Manipulation — affecting objects in the environment. 
Perception — making observations about the environment.

Modern robotics combine these capabilities, allowing them to perform more complex tasks in challenging and dynamic environments, but for the sake of clarity, let us imagine the simplest and purest instantiations of each:

- A simple locomotion robot will move from A to B on command, without needing to perceive the world or affect its surroundings. See: an elevator.
- A simple manipulation robot will affect an object in the environment without having to perceive the object, or having to move to find the object. See: a mechanized hammer.
- A simple perception robot will need to observe the environment, without having to manipulate the environment or transport itself to perform its task: See: a people-counting CCTV camera.

Correspondingly, we can think of categories of tasks in the world that map quite well to these capabilities: there are locomotion tasks, manipulation tasks, and perception tasks.

Tesla cars are locomotion robots.
Weave laundry folders are manipulation robots.
Kabam mall security rovers are perception robots.

Tesla cars obviously rely heavily on perception, but they do so in order to perform a locomotion task, just as Weave's robots rely on perception in order to perform a manipulation task, and Kabam relies on locomotion capabilities in order to perform a perception task.

Today, almost all capital and attention in robotics is going towards perfecting robots for locomotion and manipulation tasks - but I want to show you that this is almost certainly a strategic error.

### Deployment Considerations

When considering a robot for a task, there are three helpful dimensions of analysis to help us determine if the robot is right for the job:

**Value** - Can the robot perform the job cheaper or better? 
**Cost** - How much will it cost to develop, deploy and maintain the robot? 
**Risk** - How disruptive would it be if the robot malfunctioned or failed? How much uptime can you guarantee, and how catastrophic are the failure modes?

The challenge in finding good targets for deployment is finding where you can either perform a job cheaper or better, where the cost of getting started isn't prohibitive, and the risk of failure isn't too costly.

For a manipulation example, it is very costly when a robot on an auto assembly line malfunctions, because the car might be damaged - or the whole assembly line might stop until the issue has been addressed. The riskier the environment is, the more 9s of reliability you have to be able to guarantee the customer to get your foot in the door and to scale.

Looking at value and cost together gives us a sense of time to ROI, and risk gives us a sense of how much reliability we need before the deployment is viable at all. There is often a brutal reliability cliff that must be overcome before the robots can come out of pilot stage.

Looking at locomotion, self-driving cars produce valuable work, and they need not cost much more than a human-operated vehicle - but the failure modes are incredibly harmful.

Surprisingly, it turns out that there are many perception tasks in the world that are more valuable than commonly pursued manipulation tasks, with a much lower cost of R&D and deployment - but also with comparatively trivial risk profiles.

### Example: Robots for Vineyards

My good friend @jmoonio founded Budbreak, an agricultural robotics company, based on this perception-first logic. Naively, if you say you're working on robots for vineyards many will assume that you're looking to solve a manipulation task like harvesting, pruning or spraying. However, it would be extremely difficult today to do either of those tasks better than a human or cheaper than minimum wage. It would take an extraordinary effort to develop something that could solve those tasks 10% better or cheaper.

But a single crop-destroying disease destroys up to 60,000 dollars worth of grapes per hectare every year, and by building rugged "Mars rovers for vineyards", Budbreak helps the vineyard increase their yield rather than reduce their costs. As a deployment strategy, this is a combination of high value, low cost and low risk. There are tens of millions of addressable permanent crop acres in the US alone, and billions to be made securing the food supply through perception alone.

Giving the rover a modular arm, initially used to bring a camera closer for inspection, means that they have a robot mechanically capable of addressing manipulation tasks in the future - when they've already captured that territory.

### Example: Robots for Retail

More than robots that can help with restocking, retailers desperately need robots to make the most of the staff, shelves and resources that they have - and for that they need perception, rather than manipulation.

Late last year we were visited by a large European retailer, who told us that they estimate that they lose 30-60 minutes per employee per day across their 10,000+ associates, predominantly in the morning, due to the staff not really being sure what to do. Rather than a robot to replace their staffers, their ask was simple:

Can you make us a robot that drives around the store at night to figure out what needs get to done?

We had already learned with a previous retailer that a "simple" task manager in shared augmented reality allowed for better asynchronous knowledge and task transfers, saving 15 minutes per employee per day, and now this retailer wanted to take a step further and have AI populate the task list.

Another customer of ours expanded the problem-statement, explaining that tough competition means their stores have to be open from early in the morning to late at night, and that they only really have a store manager present for some of those hours. With high staff turnover, and a workforce that is often low skill and poorly motivated, those unsupervised hours are a constant drain on the business.

Another retailer added the most surprising dimension of the problem-statement: emotions. They struggle with retaining staff, which keeps training costs perpetually high, in part due to the natural friction that comes from boring tasks being assigned by another human. Their hope is that AI-assigned tasks will make the workplace less toxic, more enjoyable, and that staff will retain longer.

More than robots that can help with restocking, these retailers desperately need robots to make the most of the staff, shelves and resources that they have - and for that they need perception, rather than manipulation.

This year we plan to deploy wheeled humanoids to these domains to help with task generation, empty shelf detection, compliance checks and data capture, augmenting the value that our customers are already getting from the AI copilots we provide for their handhelds.

As with the vineyard example, this is a deployment target with high value, lower cost and much lower risk.

### The Value of Deployment

There are many opportunities today to start massively scalable deployments of perception robots, and early movers here will gain compounding benefits that may allow them to dominate better funded labs that are going for manipulation and locomotion.

Deploying gives you many benefits as a physical AI company:

- **Experience** - Operational know-how and muscle memory
- **Revenue** - Funds to accelerate your mission
- **Supply chain** - Iteratively design and discover better ways of shipping
- **Data** - Capture real-world data and create potential flywheels
- **Territory** - Capture and control scarce deployment opportunities

We can imagine a world where robots themselves become critical infrastructure, offering co-embodiment to multiple intelligence providers.

If you deploy hardware that already solves valuable perception tasks, but is also mechanically capable of manipulation given better software, you create gravitational pull. Intelligence providers are incentivized, or even compelled, to deploy onto the robots already in the field.

This is robotics as infrastructure: a mechanical substrate for AI to inhabit. An internet of sensing and actuation.

### The Path to Zero-Cost Deployment

By building protocols for collaborative perception, and treating the phones and glasses as almost-robots in their own right, we made it possible to pre-deploy the environments before the actual robots arrive.

Earlier this year, @oyhsu of a16z called for better robotics middleware and deployment automation to bring down the cost of deployment to something that can realistically scale.

When we started building our platform for collaborative machine perception in 2021, we believed you could get a head start on robotics by treating smartphones and smart glasses as robots with no arms and legs.

The minimum viable form factor for performing meaningful perception tasks was already in our users' pockets, and we would leverage that to start building a moat long before the hardware for locomotion was ready.

Start with perception. In fact, start with phones to pre-deploy the environment and give immediate utility. Radically reduce the cost of deployment. Capture territory. Offer up the extensible robot already in the domain as a platform for other providers. Embrace co-embodiment.

We built an AI copilot for retailers that allowed them to create digital twins of their environments, making them browsable, searchable and navigable. This allowed us to give the retailers new data about their stores, AI-generated tasks and recommendations, AR navigation for staff and customers, and a powerful AR task manager that allowed for asynchronous communication (and, eventually, communication with the robots.)

Importantly, we made this copilot simple enough to deploy that the retailers can do it themselves, without us sending FDEs to the thousands of locations that have already signed up to make their environments AI accessible.

A few months ago, we demonstrated how environments already set up for use with the phones, by the staffers themselves, was made instantly accessible to robots. By just showing the robot a QR code it would identify the customer site, how to contact their cloud and edge services, receive the relevant spatial context, and be ready for simple value generating tasks.

By building protocols for collaborative perception, and treating the phones and glasses as almost-robots in their own right, we made it possible to pre-deploy the environments before the actual robots arrive.

### The Case for Co-Embodiment

Despite software having eaten the world, roughly 70% of the world economy is still tied to physical locations and physical labor, measured in both headcount and GDP. Therefore, the biggest opportunity for AI to be transformative is in the physical world.

For this to happen, the internet has to grow in three new dimensions:

- An internet of spaces
- An internet of sensors
- An internet of actuators

The real world web is our attempt to make the physical world accessible to AI, making deployments easier and collaboration smoother by providing an early internet of spaces and sensors. Multiple devices and robots can collaboratively map and reason about a domain in a privacy-preserving way, with granular role-based access controls and the ability to self-host while still being discoverable and interoperable with third parties.

What comes next is more advanced co-embodiment inside the robots themselves: the internet of actuators.

In a world where robots deployed by Auki, Budbreak and other real world web developers have already captured territory, there is ample incentive for other intelligence providers to focus their efforts on that platform to reach customers at much lower cost to themselves and the customer.

Rather than trying to build one AI to rule them all, we embrace the idea that different app developers and intelligence providers will excel in different areas, and that the end user will want to pick and choose which utilities they run together at the same time. In a world where multiple applications and agents can share access to the robot-as-infrastructure, both the end users and developer ecosystem will benefit.

### The Bull Case for Capturing Territory

There are millions of retailers in the world today that manage complex physical environments with very little assistance from AI. After all, how can AI assist them when the physical world is beyond their reach?

Tens of millions of people work on retail floors, helping customers, moving products, stocking shelves and tidying up. They're often lower on the skill and education spectrum, staff turnover is incredibly high, and language difficulties are common in many modern multi-cultural countries.

Through a combination of phones, glasses and robots, these environments can be made more productive, profitable, but also nicer places to work and visit.

Last summer we released our first co-pilot for retail workers, and the results have been impressive:

- 15 minutes saved per employee per day on handovers
- 20-40% reduced walking distance for staff
- Faster order fulfillment
- Lower training cost

The retailers are already paying us 500 dollars per location per month for the phone-based copilot - comparable to what early manipulation robots like Weave and 1x capture, but without the complexity and scaling bottlenecks.

This year, we're rolling out task-generating glasses, performing perception tasks while the staffers are on the move, and robots that audit the state of the store and continuously and autonomously capture more data that helps the stores run better.

We believe we can realistically scale this into the order of 100,000 retail locations by the end of 2030, because our customers themselves are the FDEs, and the utility is undeniable.

100,000 robots generating 100 dollars of day per revenue, and a million glasses generating 10 dollars per day revenue, and 500 dollars per location per month just for the phone companion means you can realistically scale just retail perception to many billions in recurring revenue in a relatively short timeframe.

These 100,000 robots and 1,000,000 glasses and countless smartphones will be the mechanical substrate for increasingly intelligent agents to inhabit - the next extension of the internet itself.

But retail and agriculture is just the beginning. We're building the decentralized nervous system for physical AI, so that 70% of the world economy can be brought into the light of the AI era.

# Our Values

Transformative technology requires transformative narratives. We have to not only be an engineering company, but a memetic engineering company, mindful of how we interact with the information landscape. 

Healthy memes are the core of a well functioning operation. Here are a few of ours.

## **Spread Good Memes**

What we say and do echoes through the behavior of others. Let us be mindful of what memes we propagate and our memetic footprint.

This is both a positive call to action, but also a reminder that negative behaviours spread too.
When you see a good idea, share it. Spread good memes.

## **Think out loud**

Complex ideas require a lot of thought to get right, and not thinking things through can lead you down dead ends.

When you share your ideas with a colleague early it forces you to put language to your thoughts, which helps it crystallize and, more importantly, propagate.

When designing a solution, we encourage each other to think out loud together.
Expressing our ideas early helps us get the most out of work with inter-cognitive reasoning.

## **Keep learning**

The world is moving incredibly fast, and there are new opportunities and challenges coming our way constantly. Let’s not be complacent in our expertise, but be humble when presented with new information.

Winning this race will require being the best, and becoming the best will require a lot of learning.

## **Train for the Olympics**

Our destination is not our destiny. Building the future we believe in will take an extraordinary amount of effort, contribution and discipline.

We have to be mindful that audacious visions need eormous care. We have to care. A historical opportunity has been presented to us, and we must bring our very best to live up to this worthy challenge.

At Auki you’ll be given the space, opportunity and mandate to do the best work of your career - because we will have to be the best to win.

## **Every space has a purpose**

Being productive means being in the right headspace for long periods of time. Creating and maintaining productive spaces is difficult, especially if we are not mindful about it.

Every space has a purpose. Every conversation has a desired outcome. Exercise space hygiene and help keep our conversations on topic and our spaces fit for purpose.

## **Radical sincerity**

The cultural landscape of civilization is in a bad state. It’s becoming increasingly hard to trust information, and there are many bad actors that lie without flinching.

Nothing is more powerful than the truth. Being truthful in our interactions with each other and the world means being sincere. Let’s be radically sincere, outspoken and honest about what we are trying to do and how we are trying to win.

# Channels

| Platform | Handle / URL |
|----------|-------------|
| X/Twitter | https://x.com/auki |
| Discord | https://discord.gg/auki |
| Telegram | https://t.me/AukiNetwork |
| Website | https://auki.com/ |
| GitHub | https://github.com/aukilabs/ |
| YouTube | https://www.youtube.com/@aukilabs |
