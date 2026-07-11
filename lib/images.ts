
const unsplash = (id: string, w = 1920) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

export const IMAGES = {
  // Abstract network / data — technology & AI mood
  network: unsplash('photo-1644325349124-d1756b79dd42'),
  // Crowd seated at a conference — used for the Solutions banner
  crowd: unsplash('photo-1540575467063-178a50c2df87'),
  // People talking inside a conference hall — "For Attendees"
  conferencePeople: unsplash('photo-1531058020387-3be344556be6'),
  // Five people standing, talking — "Networking" feature
  talkingGroup: unsplash('photo-1515169067868-5387ec356754'),
  // Group of people gathering outdoors — "For Communities"
  gathering: unsplash('photo-1550177977-ad69e8f3cae0'),
  // Person using a MacBook Pro — How it Works banner
  laptopHero: unsplash('photo-1486312338219-ce68d2c6f44d'),
  // Person using a laptop — "Messaging" feature
  laptopMessaging: unsplash('photo-1515378791036-0648a3ef77b2'),
  // People around a conference table, one presenting — "Meetings" / "For Event Organizers"
  meetingTable: unsplash('photo-1573167507387-6b4b98cb7c13'),
  // Oval wooden boardroom table — Pricing banner
  boardroom: unsplash('photo-1431540015161-0bf868a2d407'),
  // Person using a MacBook — Resources banner
  laptopResources: unsplash('photo-1499914485622-a88fac536970'),
  // Crowd in a building lobby — "For Sponsors"
  lobbyCrowd: unsplash('photo-1560439514-4e9645039924'),
  // Person typing on a silver MacBook — "Blog"
  laptopTyping: unsplash('photo-1516387938699-a93567ec168e'),
  // Person using a laptop — "FAQs"
  laptopFaq: unsplash('photo-1508780709619-79562169bc64'),
};