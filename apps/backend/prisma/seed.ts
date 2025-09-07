import { PrismaClient, User, Post } from '@prisma/client';

const prisma = new PrismaClient();

// 真实的名字数据
const firstNames = [
  'Alice',
  'Bob',
  'Carol',
  'David',
  'Emma',
  'Frank',
  'Grace',
  'Henry',
  'Isabella',
  'Jack',
  'Kate',
  'Liam',
  'Mia',
  'Noah',
  'Olivia',
  'Peter',
  'Quinn',
  'Rachel',
  'Sam',
  'Taylor',
  'Uma',
  'Victor',
  'Wendy',
  'Xavier',
  'Yara',
  'Zoe',
  'Aaron',
  'Bella',
  'Chris',
  'Diana',
  'Ethan',
  'Fiona',
  'George',
  'Hannah',
  'Ian',
  'Julia',
  'Kevin',
  'Luna',
  'Mason',
  'Nina',
  'Oscar',
  'Penny',
  'Quincy',
  'Ruby',
  'Steve',
  'Tina',
  'Ulysses',
  'Violet',
  'William',
  'Xara',
  'Yale',
  'Zara',
  'Alex',
  'Beth',
  'Cole',
  'Daria',
  'Eli',
  'Faith',
  'Gary',
  'Hope',
  'Ivan',
  'Jade',
  'Kyle',
  'Leah',
  'Max',
  'Nora',
  'Owen',
  'Piper',
  'Quentin',
  'Rose',
  'Sean',
  'Thea',
  'Uri',
  'Vera',
  'Wade',
  'Xenia',
  'York',
  'Zelda',
  'Adam',
  'Brooke',
  'Caleb',
  'Dahlia',
  'Edgar',
  'Flora',
  'Gavin',
  'Hazel',
  'Isaac',
  'Jasmine',
  'Kane',
  'Lily',
  'Marcus',
  'Naomi',
  'Oliver',
  'Paige',
  'Quinton',
  'Rita',
  'Simon',
  'Terra',
  'Ulrich',
  'Valerie',
  'Warren',
  'Xyla',
  'Yorick',
  'Zana',
];

const lastNames = [
  'Smith',
  'Johnson',
  'Williams',
  'Brown',
  'Jones',
  'Garcia',
  'Miller',
  'Davis',
  'Rodriguez',
  'Martinez',
  'Hernandez',
  'Lopez',
  'Gonzalez',
  'Wilson',
  'Anderson',
  'Thomas',
  'Taylor',
  'Moore',
  'Jackson',
  'Martin',
  'Lee',
  'Perez',
  'Thompson',
  'White',
  'Harris',
  'Sanchez',
  'Clark',
  'Ramirez',
  'Lewis',
  'Robinson',
  'Walker',
  'Young',
  'Allen',
  'King',
  'Wright',
  'Scott',
  'Torres',
  'Nguyen',
  'Hill',
  'Flores',
  'Green',
  'Adams',
  'Nelson',
  'Baker',
  'Hall',
  'Rivera',
  'Campbell',
  'Mitchell',
  'Carter',
  'Roberts',
  'Gomez',
  'Phillips',
  'Evans',
  'Turner',
  'Diaz',
  'Parker',
];

const companies = [
  'TechCorp',
  'InnovateLab',
  'DesignStudio',
  'CodeCraft',
  'DataFlow',
  'CloudNine',
  'PixelPerfect',
  'DevHub',
  'StartupXYZ',
  'CreativeSpace',
  'SoftSolutions',
  'WebWorks',
  'AppFactory',
  'DigitalDream',
  'TechVision',
  'CodeLab',
  'InnovateCo',
  'DesignForge',
  'DevCentric',
  'CreativeTech',
  'SoftwareHouse',
  'WebStudio',
  'AppCraft',
  'DigitalEdge',
  'TechNova',
  'CodeForge',
  'InnovateHub',
  'DesignCraft',
  'DevStudio',
  'CreativeCode',
  'Microsoft',
  'Google',
  'Apple',
  'Meta',
  'Amazon',
  'Netflix',
  'Tesla',
  'SpaceX',
  'Uber',
  'Airbnb',
  'Spotify',
  'Adobe',
  'Salesforce',
  'Oracle',
  'IBM',
  'Intel',
  'Nvidia',
  'Twitter',
  'LinkedIn',
  'Snapchat',
  'Pinterest',
  'Shopify',
  'Stripe',
  'Freelancer',
  'Self-employed',
  'Consultant',
  'Entrepreneur',
];

const cities = [
  'San Francisco, CA',
  'New York, NY',
  'Los Angeles, CA',
  'Seattle, WA',
  'Austin, TX',
  'Boston, MA',
  'Chicago, IL',
  'Denver, CO',
  'Miami, FL',
  'Portland, OR',
  'Nashville, TN',
  'Atlanta, GA',
  'Phoenix, AZ',
  'Dallas, TX',
  'Washington, DC',
  'Philadelphia, PA',
  'San Diego, CA',
  'Las Vegas, NV',
  'Detroit, MI',
  'Minneapolis, MN',
  'London, UK',
  'Berlin, Germany',
  'Paris, France',
  'Tokyo, Japan',
  'Toronto, Canada',
  'Sydney, Australia',
  'Amsterdam, Netherlands',
  'Stockholm, Sweden',
  'Copenhagen, Denmark',
  'Zurich, Switzerland',
  'Barcelona, Spain',
  'Milan, Italy',
  'Dublin, Ireland',
];

const bioTemplates = [
  (company: string) =>
    `Full-stack developer passionate about creating amazing user experiences at ${company}`,
  (company: string) =>
    `Frontend engineer who loves React, TypeScript, and modern web technologies. Working at ${company}`,
  (company: string) =>
    `Backend developer specializing in scalable systems and cloud architecture. Currently at ${company}`,
  (company: string) =>
    `UX/UI designer focused on user-centered design and accessibility. Designing at ${company}`,
  (company: string) =>
    `Product manager bridging the gap between tech and business at ${company}`,
  (company: string) =>
    `DevOps engineer optimizing infrastructure and deployment pipelines at ${company}`,
  (company: string) =>
    `Data scientist turning data into insights and actionable strategies at ${company}`,
  (company: string) =>
    `Mobile app developer creating iOS and Android experiences at ${company}`,
  (company: string) =>
    `Tech lead mentoring teams and architecting solutions at ${company}`,
  (company: string) =>
    `Software engineer passionate about clean code and best practices. Building at ${company}`,
  (company: string) =>
    `Digital marketing specialist driving growth and engagement at ${company}`,
  (company: string) =>
    `Cybersecurity expert protecting digital assets and privacy at ${company}`,
  (company: string) =>
    `AI/ML engineer working on the future of intelligent systems at ${company}`,
  (company: string) =>
    `Game developer creating immersive experiences and interactive worlds at ${company}`,
  (company: string) =>
    `Technical writer making complex topics accessible and clear at ${company}`,
  () =>
    'Freelance developer building custom solutions for startups and enterprises',
  () => 'Independent consultant helping companies with digital transformation',
  () => 'Open source contributor and community organizer',
  () => 'Entrepreneur building the next generation of tech products',
  () => 'Student learning computer science and exploring new technologies',
  () => 'Career changer transitioning into tech from finance background',
  () => 'Remote worker advocating for distributed teams and work-life balance',
  () =>
    'Tech blogger sharing insights about software development and industry trends',
  () => 'Mentor helping junior developers grow their careers',
  () =>
    'Conference speaker passionate about knowledge sharing and community building',
];

const websites = [
  'github.io',
  'portfolio.dev',
  'personal.com',
  'blog.me',
  'website.net',
  'dev.to',
  'medium.com',
  'linkedin.com/in',
  'twitter.com',
  'instagram.com',
];

// 修复后的用户名生成函数，确保唯一性
function generateUsername(
  firstName: string,
  lastName: string,
  index: number,
): string {
  const variations = [
    `${firstName.toLowerCase()}${lastName.toLowerCase()}${index}`,
    `${firstName.toLowerCase()}_${lastName.toLowerCase()}_${index}`,
    `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${index}`,
    `${firstName.toLowerCase()}${index}`,
    `${firstName.toLowerCase()}_dev_${index}`,
    `${firstName.toLowerCase()}_codes_${index}`,
    `${firstName.toLowerCase()}_tech_${index}`,
    `${lastName.toLowerCase()}_${firstName.toLowerCase()}_${index}`,
  ];
  return variations[index % variations.length];
}

function generateWebsite(firstName: string, lastName: string, index: number): string {
  const domain = websites[Math.floor(Math.random() * websites.length)];
  const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}${index}`;

  if (domain.includes('.com/') || domain.includes('.to/')) {
    return `https://${domain}/${username}`;
  }
  return `https://${username}.${domain}`;
}

async function main() {
  console.log('开始创建丰富的种子数据...');

  // 明确声明类型
  const users: User[] = [];

  // 用于跟踪已使用的用户名，确保唯一性
  const usedUsernames = new Set<string>();

  // 生成120个用户
  for (let i = 0; i < 120; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const fullName = `${firstName} ${lastName}`;
    const company = companies[Math.floor(Math.random() * companies.length)];
    const location = cities[Math.floor(Math.random() * cities.length)];

    // 生成唯一的用户名
    let username = generateUsername(firstName, lastName, i);
    let attempts = 0;
    while (usedUsernames.has(username) && attempts < 10) {
      username = generateUsername(firstName, lastName, i + attempts * 1000);
      attempts++;
    }
    usedUsernames.add(username);

    // 选择一个bio模板
    const bioTemplate =
      bioTemplates[Math.floor(Math.random() * bioTemplates.length)];
    const bio = bioTemplate(company);

    const user = await prisma.user.create({
      data: {
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${i}@example.com`,
        username: username,
        name: fullName,
        bio: bio,
        location: location,
        website:
          Math.random() > 0.3 ? generateWebsite(firstName, lastName, i) : null,
        company: company,
        phone:
          Math.random() > 0.5
            ? `+1-555-${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`
            : null,
      },
    });

    users.push(user);

    if ((i + 1) % 20 === 0) {
      console.log(`已创建 ${i + 1} 个用户...`);
    }
  }

  console.log(`成功创建 ${users.length} 个用户！`);

  // 创建150个帖子
  const postTitles = [
    'Getting started with React Hooks',
    'Why TypeScript is essential for large projects',
    'Building scalable microservices architecture',
    'The future of web development',
    'Best practices for code reviews',
    'Understanding async/await in JavaScript',
    'CSS Grid vs Flexbox: When to use what',
    'Docker containers in production',
    'API design principles that matter',
    'Database optimization techniques',
    'Machine learning basics for developers',
    'Security best practices for web apps',
    'The art of debugging complex issues',
    'Remote work productivity tips',
    'Open source contribution guide',
    'Performance optimization strategies',
    'Testing strategies for modern apps',
    'DevOps culture and practices',
    'User experience design principles',
    'Agile development methodologies',
  ];

  const postContents = [
    "Sharing some insights about modern development practices and what I've learned recently.",
    'Here are my thoughts on the latest trends in technology and software development.',
    'Working on an exciting project that combines innovation with practical solutions.',
    'Learned something new today that I wanted to share with the community.',
    'Reflecting on the journey from junior to senior developer and key lessons learned.',
    'Exploring the intersection of design and development in creating user-friendly applications.',
    'Building something cool with the latest frameworks and sharing the experience.',
    'Thoughts on the importance of continuous learning in the fast-paced tech industry.',
    'Collaborating with amazing teams and seeing the power of collective problem-solving.',
    'Diving deep into system design and architecture patterns for scalable applications.',
  ];

  const posts: Post[] = [];
  for (let i = 0; i < 150; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const title = postTitles[Math.floor(Math.random() * postTitles.length)];
    const content =
      postContents[Math.floor(Math.random() * postContents.length)];

    const post = await prisma.post.create({
      data: {
        title: `${title} ${i > 50 ? '- Part ' + Math.floor(Math.random() * 3 + 1) : ''}`,
        content: content,
        authorId: randomUser.id,
        createdAt: new Date(
          Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000,
        ),
      },
    });

    posts.push(post);
  }

  console.log(`创建了 ${posts.length} 个帖子`);

  // 创建随机的点赞关系
  const likesCount = Math.floor(posts.length * 2.5);
  for (let i = 0; i < likesCount; i++) {
    try {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomPost = posts[Math.floor(Math.random() * posts.length)];

      await prisma.like.create({
        data: {
          userId: randomUser.id,
          postId: randomPost.id,
        },
      });
    } catch (error) {
      // 忽略重复的点赞关系
    }
  }

  // 创建随机的关注关系
  const followsCount = Math.floor(users.length * 1.5);
  for (let i = 0; i < followsCount; i++) {
    try {
      const follower = users[Math.floor(Math.random() * users.length)];
      const following = users[Math.floor(Math.random() * users.length)];

      if (follower.id !== following.id) {
        await prisma.follow.create({
          data: {
            followerId: follower.id,
            followingId: following.id,
          },
        });
      }
    } catch (error) {
      // 忽略重复的关注关系
    }
  }

  console.log('种子数据创建完成! 🎉');
  console.log(`- ${users.length} 个用户`);
  console.log(`- ${posts.length} 个帖子`);
  console.log('- 随机的点赞和关注关系');
}

main()
  .catch((e) => {
    console.error('种子数据创建失败:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });