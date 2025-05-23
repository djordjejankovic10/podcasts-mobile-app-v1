import { CommunityHeader } from "@/components/community/CommunityHeader";
import { CommunityTabs } from "@/components/community/CommunityTabs";
import { FeedPost } from "@/components/community/FeedPost";
import { CreatePost } from "@/components/community/CreatePost";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { SortOptions } from "@/components/community/SortOptions";
import { UIPreferencesProvider } from "@/context/UIPreferences";
import { NavigationToggle } from "@/components/community/NavigationToggle";
import { ConditionalCommunityTabs } from "@/components/community/ConditionalCommunityTabs";
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { BookOpen, Plus, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Helper function to get category icons
const getCategoryIconName = (category: string): string => {
  if (!category) return "message-circle";
  
  const lowerCase = category.toLowerCase();
  if (lowerCase === 'weight-training') return "dumbbell";
  if (lowerCase === 'cardio') return "heart";
  if (lowerCase === 'yoga') return "stretch-vertical";
  if (lowerCase === 'recovery') return "battery";
  if (lowerCase === 'nutrition') return "apple";
  if (lowerCase === 'keto-diet') return "utensils";
  return "message-circle"; // Default icon
};

export const MOCK_POSTS = [
  // Long post example with "See more" button
  {
    index: 0,
    category: "fitness",
    author: {
      firstName: "Sarah",
      lastName: "Williams",
      handle: "sarahfit",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
      verified: true,
      role: "admin" as const
    },
    content: `# My 30-Day Fitness Journey: Transforming Mind and Body

Hello Bloom Community! 👋

I wanted to share my recent 30-day fitness journey that completely transformed not just my body, but my entire mindset about health and wellness.

## The Challenge

I challenged myself to 30 days of consistent exercise, mindful eating, and proper recovery. Here's what my routine looked like:

- 🏋️‍♀️ Strength training: 4 days/week
- 🏃‍♀️ Cardio: 3 days/week (mix of HIIT and steady-state)
- 🧘‍♀️ Yoga/mobility: Daily (even if just for 10 minutes)
- 💧 Water intake: Minimum 3 liters daily
- 😴 Sleep: Prioritized 7-8 hours every night

## The Struggles

Let me be honest - it wasn't always easy. There were days when my motivation was at rock bottom. Week 2 was particularly challenging as my body was adjusting to the new routine. I hit a plateau around day 18 and felt like giving up.

## The Breakthroughs

Around day 21, something magical happened. The workouts that once felt impossible became manageable. I started looking forward to my morning routine. My energy levels stabilized, and I noticed significant improvements in my mood and focus throughout the day.

## Physical Changes

- Lost 4.5 pounds (mostly fat, preserved muscle)
- Dropped 1.5 inches from my waist
- Increased my push-up max from 10 to 18
- Improved my mile time by 45 seconds

## Mental Changes (The Real Victory)

- Reduced anxiety levels
- Better stress management
- Improved sleep quality
- Enhanced focus at work
- Greater overall confidence

## Key Lessons Learned

1. **Consistency trumps intensity**: Showing up every day, even for a lighter workout, is more important than occasional intense sessions.

2. **Progress isn't linear**: Some days you'll feel stronger, some days weaker. Trust the process.

3. **Community matters**: Having accountability partners (thank you to everyone who supported me here!) made all the difference.

4. **Recovery is not optional**: Rest days and proper sleep are when the real transformation happens.

5. **Mindset is everything**: Approaching fitness as a form of self-care rather than punishment changed everything.

I'm sharing this not to boast, but to hopefully inspire someone who might be hesitating to start their own journey. Remember, the goal isn't perfection - it's progress.

Who's ready to take on their own 30-day challenge? I'm happy to share my detailed workout plan and nutrition approach with anyone interested!

#FitnessJourney #30DayChallenge #MindBodyTransformation`,
    timestamp: "2h",
    metrics: {
      likes: 287,
      comments: 42
    },
    media: {
      type: "image" as const,
      url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop"
    },
    replies: [
      {
        author: {
          firstName: "Michael",
          lastName: "Carter",
          handle: "mikefitness",
          avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop",
          role: "founder" as const
        },
        content: "This is absolutely inspiring, Sarah! Your dedication is exactly what our community is all about. Would love to feature your journey in our next newsletter if you're open to it.",
        timestamp: "1h 45m",
        metrics: {
          likes: 89,
          comments: 2
        },
        replies: [
          {
            author: {
              firstName: "Sarah",
              lastName: "Williams",
              handle: "sarahfit",
              avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
              role: "admin" as const
            },
            content: "Absolutely! I'd be honored. Just DM me the details.",
            timestamp: "1h 30m",
            metrics: {
              likes: 24,
              comments: 0
            }
          }
        ]
      },
      {
        author: {
          firstName: "Tanya",
          lastName: "Rodriguez",
          handle: "tanyafitlife",
          avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop"
        },
        content: "Thank you for sharing such a detailed account of your journey! Question: did you follow a specific meal plan during these 30 days or just focus on general nutrition principles?",
        timestamp: "1h 20m",
        metrics: {
          likes: 42,
          comments: 1
        },
        category: "nutrition"
      },
      {
        author: {
          firstName: "David",
          lastName: "Kim",
          handle: "davidkim",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop"
        },
        content: "That plateau on day 18 is so relatable! I've hit that wall in every fitness program I've tried. Would love to know more about how you pushed through it mentally.",
        timestamp: "55m",
        metrics: {
          likes: 35,
          comments: 0
        },
        media: {
          type: "image" as const,
          url: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&h=300&fit=crop"
        }
      }
    ]
  },
  // Repost example
  {
    index: 9,
    author: {
      firstName: "Alex",
      lastName: "Johnson",
      handle: "alexj",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
    },
    content: "This is such a great tip! I always stretch for 10 minutes after my runs.",
    timestamp: "15m",
    metrics: {
      likes: 42,
      comments: 5
    },
    replies: [
      {
        author: {
          firstName: "Jamie",
          lastName: "Lee",
          handle: "jamierunner",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
        },
        content: "Same here! I noticed way fewer injuries once I started taking post-run stretching seriously. What's your favorite stretch?",
        timestamp: "12m",
        metrics: {
          likes: 8,
          comments: 1
        }
      },
      {
        author: {
          firstName: "Alex",
          lastName: "Johnson",
          handle: "alexj",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
        },
        content: "@jamierunner Definitely the standing quad stretch and seated hamstring stretch. Game changers!",
        timestamp: "8m",
        metrics: {
          likes: 4,
          comments: 0
        }
      },
      {
        author: {
          firstName: "Emma",
          lastName: "Davis",
          handle: "nutritioncoach",
          avatar: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&h=400&fit=crop",
          role: "admin" as const
        },
        content: "Thanks for sharing, Alex! It's always great to see members adding their own experiences to the tips shared here.",
        timestamp: "5m",
        metrics: {
          likes: 12,
          comments: 0
        }
      }
    ],
    originalPost: {
      author: {
        firstName: "Emma",
        lastName: "Davis",
        handle: "nutritioncoach",
        avatar: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&h=400&fit=crop",
        verified: true,
        role: "admin" as const
      },
      content: "🧘‍♀️ Starting your yoga journey? Here's my beginner-friendly guide to essential poses that will help improve your flexibility and strength. Perfect for busy gym-goers who want to add yoga to their routine.",
      timestamp: "5h",
      metrics: {
        likes: 1243,
        comments: 234
      },
      media: {
        type: "link" as const,
        url: "https://www.verywellfit.com/essential-yoga-poses-for-beginners-3566747",
        title: "31 Yoga Poses for Beginners",
        domain: "verywellfit.com"
      }
    }
  },
  {
    index: 1,
    category: "weight-training",
    author: {
      firstName: "John",
      lastName: "Smith",
      handle: "fitnesspro",
      avatar: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&h=400&fit=crop",
      verified: true,
      role: "founder" as const,
    },
    content: "Just crushed a new deadlift PR! 💪 Remember: proper form is everything. Here's my top 3 tips for maintaining perfect form during heavy lifts. What's your current PR goal?",
    timestamp: "2h",
    metrics: {
      likes: 842,
      comments: 156
    },
    media: {
      type: "link" as const,
      url: "https://www.healthline.com/health/shoulder-pain-exercises",
      title: "Top 10 Exercises to Relieve Shoulder Pain and Tightness",
      domain: "healthline.com",
    },
    replies: [
      {
        author: {
          firstName: "Sarah",
          lastName: "Johnson",
          handle: "gymlife",
          avatar: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop",
        },
        content: "Amazing progress! My current goal is 405lbs by end of month. Your form tips have been super helpful! 🎯",
        timestamp: "1h",
        metrics: {
          likes: 156,
          comments: 12
        },
        replies: [
          {
            author: {
              firstName: "John",
              lastName: "Smith",
              handle: "fitnesspro",
              avatar: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&h=400&fit=crop",
              role: "founder" as const
            },
            content: "That's an impressive goal, Sarah! Let me know if you want any feedback on your technique. It's all about that hip hinge.",
            timestamp: "55m",
            metrics: {
              likes: 45,
              comments: 0
            },
            replies: [
              {
                author: {
                  firstName: "Sarah",
                  lastName: "Johnson",
                  handle: "gymlife",
                  avatar: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop",
                },
                content: "Definitely would appreciate that! I struggle with keeping my back straight at heavier weights. Any specific cues you recommend?",
                timestamp: "45m",
                metrics: {
                  likes: 12,
                  comments: 0
                },
                replies: [
                  {
                    author: {
                      firstName: "John",
                      lastName: "Smith",
                      handle: "fitnesspro",
                      avatar: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&h=400&fit=crop",
                      role: "founder" as const
                    },
                    content: "Try thinking 'proud chest' and 'bend the bar around your legs'. Also, film yourself from the side to check your form - you'll be surprised how helpful this is!",
                    timestamp: "39m",
                    metrics: {
                      likes: 21,
                      comments: 0
                    }
                  },
                  {
                    author: {
                      firstName: "Alex",
                      lastName: "Rodriguez",
                      handle: "alexfitness",
                      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
                    },
                    content: "I struggled with the same issue. What helped me was doing pause deadlifts with lighter weight to build positional strength. @gymlife give it a try!",
                    timestamp: "32m",
                    metrics: {
                      likes: 8,
                      comments: 0
                    }
                  }
                ]
              },
              {
                author: {
                  firstName: "Emma",
                  lastName: "Davis",
                  handle: "nutritioncoach",
                  avatar: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&h=400&fit=crop",
                  role: "admin" as const
                },
                content: "Great conversation here! Proper form is so crucial not just for performance but for staying injury-free. @John_Smith your tutorials have helped so many in the community!",
                timestamp: "28m",
                metrics: {
                  likes: 19,
                  comments: 0
                }
              }
            ]
          }
        ]
      },
      {
        author: {
          firstName: "Marcus",
          lastName: "Chen",
          handle: "liftmaster",
          avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=400&fit=crop"
        },
        content: "Congrats on the PR! What's your warm-up routine before heavy deadlifts? I've been struggling with getting properly activated.",
        timestamp: "1h 45m",
        metrics: {
          likes: 78,
          comments: 1
        }
      },
      {
        author: {
          firstName: "John",
          lastName: "Smith",
          handle: "fitnesspro",
          avatar: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&h=400&fit=crop",
          role: "founder" as const
        },
        content: "@liftmaster I do 5 minutes light cardio, then band pull-aparts, kettlebell swings, and light Romanian deadlifts. I find activating glutes and hamstrings first makes a huge difference.",
        timestamp: "1h 30m",
        metrics: {
          likes: 92,
          comments: 0
        },
        category: "weight-training"
      },
      {
        author: {
          firstName: "Priya",
          lastName: "Patel",
          handle: "priyalifts",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
        },
        content: "Your tips helped me correct my deadlift form and I'm finally seeing progress without low back pain! Currently at 225lbs and aiming for 275 by summer 💪",
        timestamp: "30m",
        metrics: {
          likes: 64,
          comments: 0
        },
        media: {
          type: "image" as const,
          url: "https://images.unsplash.com/photo-1517344884509-a0c97ec11bcc?w=400&h=300&fit=crop"
        }
      }
    ],
  },
  {
    index: 2,
    category: "yoga",
    author: {
      firstName: "Emma",
      lastName: "Davis",
      handle: "nutritioncoach",
      avatar: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&h=400&fit=crop",
      verified: true,
      role: "admin" as const,
    },
    content: "🧘‍♀️ Starting your yoga journey? Here's my beginner-friendly guide to essential poses that will help improve your flexibility and strength. Perfect for busy gym-goers who want to add yoga to their routine.",
    timestamp: "5h",
    metrics: {
      likes: 1243,
      comments: 234
    },
    media: {
      type: "link" as const,
      url: "https://www.verywellfit.com/essential-yoga-poses-for-beginners-3566747",
      title: "31 Yoga Poses for Beginners",
      domain: "verywellfit.com",
      thumbnail: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=600&h=400&fit=crop",
    },
    replies: [
      {
        author: {
          firstName: "Rachel",
          lastName: "Green",
          handle: "rachelg",
          avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop"
        },
        content: "I've been intimidated by yoga for so long, but these poses look manageable! Do you think it's better to start with a class or follow along with videos at home?",
        timestamp: "4h 30m",
        metrics: {
          likes: 67,
          comments: 1
        }
      },
      {
        author: {
          firstName: "Emma",
          lastName: "Davis",
          handle: "nutritioncoach",
          avatar: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&h=400&fit=crop",
          role: "admin" as const
        },
        content: "@rachelg Great question! If you're completely new, I'd recommend starting with a beginner class so an instructor can check your form. Once you're comfortable with the basics, home practice with videos is perfect for consistency!",
        timestamp: "4h 15m",
        metrics: {
          likes: 48,
          comments: 0
        }
      },
      {
        author: {
          firstName: "Jason",
          lastName: "Wong",
          handle: "jasonw",
          avatar: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=400&h=400&fit=crop"
        },
        content: "I've been doing yoga as part of my recovery days between heavy lifting sessions and it's been a game changer. Improved my flexibility and actually helped with my squat depth!",
        timestamp: "3h 20m",
        metrics: {
          likes: 94,
          comments: 2
        },
        category: "weight-training",
        replies: [
          {
            author: {
              firstName: "Lisa",
              lastName: "Park",
              handle: "lisastrong",
              avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop"
            },
            content: "I've had the same experience! What specific poses have you found most helpful for squat mobility?",
            timestamp: "3h",
            metrics: {
              likes: 28,
              comments: 0
            }
          },
          {
            author: {
              firstName: "Jason",
              lastName: "Wong",
              handle: "jasonw",
              avatar: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=400&h=400&fit=crop"
            },
            content: "@lisastrong Pigeon pose, lizard pose, and deep yogic squats (malasana) have been the most effective for me. I do them 3x a week for about 15 minutes.",
            timestamp: "2h 45m",
            metrics: {
              likes: 37,
              comments: 0
            }
          }
        ]
      },
      {
        author: {
          firstName: "Amir",
          lastName: "Hassan",
          handle: "amiryoga",
          avatar: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop"
        },
        content: "This guide is great! One tip I'd add for beginners: don't compare yourself to others in class or online. Yoga is about YOUR journey and progress. Some days you'll be more flexible than others, and that's perfectly okay.",
        timestamp: "2h",
        metrics: {
          likes: 112,
          comments: 0
        },
        media: {
          type: "image" as const,
          url: "https://images.unsplash.com/photo-1532798442725-41036acc7489?w=400&h=300&fit=crop"
        }
      }
    ]
  },
  {
    index: 3,
    category: "cardio",
    author: {
      firstName: "Mike",
      lastName: "Johnson",
      handle: "fitcoach",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      verified: true,
    },
    content: "Just wrapped up an amazing outdoor workout session! 🌞 Check out this beautiful trail - perfect for morning runs and HIIT exercises. Who else loves outdoor workouts?",
    timestamp: "1h",
    metrics: {
      likes: 324,
      comments: 42,
      shares: 8,
    },
    media: {
      type: "image" as const,
      url: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=400&fit=crop",
    },
    replies: [
      {
        author: {
          firstName: "Jamie",
          lastName: "Korsgaard",
          handle: "jamiek",
          avatar: "https://images.unsplash.com/photo-1542103749-8ef59b94f47e?w=400&h=400&fit=crop"
        },
        content: "That trail looks amazing! Where is this located? I've been looking for new running spots.",
        timestamp: "45m",
        metrics: {
          likes: 18,
          comments: 2,
          shares: 0
        }
      },
      {
        author: {
          firstName: "David",
          lastName: "Park",
          handle: "dpark",
          avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop"
        },
        content: "Outdoor workouts are the best! Nothing beats fresh air and sunshine for motivation. I usually hit the park near my place every morning.",
        timestamp: "32m",
        metrics: {
          likes: 11,
          comments: 0,
          shares: 0
        }
      },
      {
        author: {
          firstName: "Mike",
          lastName: "Johnson",
          handle: "fitcoach",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
          verified: true
        },
        content: "@jamiek It's the Cedar Ridge Trail just outside the city! About a 15-minute drive from downtown. Happy to share the exact location if you want to check it out!",
        timestamp: "28m",
        metrics: {
          likes: 7,
          comments: 0,
          shares: 0
        }
      }
    ],
  },
  {
    index: 4,
    author: {
      firstName: "Lisa",
      lastName: "Chen",
      handle: "yogalife",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      verified: true,
      role: "admin" as const,
    },
    content: "New beginner-friendly yoga flow! 🧘‍♀️ Focus on breathing and gentle stretches. Perfect for morning routines or desk break refreshers. Save this for later! #YogaEveryday",
    timestamp: "30m",
    metrics: {
      likes: 567,
      comments: 89,
      shares: 23,
    },
    media: {
      type: "link" as const,
      url: "https://www.fitbody.com/healthy-recipes/protein-bowl",
      title: "The Ultimate Protein Bowl - 5 Variations",
      domain: "fitbody.com",
      thumbnail: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",
    },
  },
  {
    index: 5,
    author: {
      firstName: "Mike",
      lastName: "Johnson",
      handle: "fitcoach",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      verified: true,
    },
    content: "Check out my latest workout tutorial! 💪 Perfect for beginners looking to build strength and improve form.",
    timestamp: "2h",
    metrics: {
      likes: 324,
      comments: 42,
      shares: 8,
    },
    media: {
      type: "video" as const,
      url: "https://example.com/workout-video.mp4",
      thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&fit=crop",
    },
    replies: [
      {
        author: {
          firstName: "Taylor",
          lastName: "Wilson",
          handle: "taylorw",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
        },
        content: "This is exactly what I needed! I've been struggling with proper form on squats. Thanks for breaking it down step by step!",
        timestamp: "1h 45m",
        metrics: {
          likes: 28,
          comments: 1,
          shares: 0
        }
      },
      {
        author: {
          firstName: "Carlos",
          lastName: "Rodriguez",
          handle: "carlosr",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
        },
        content: "Great tutorial! Question - what weight do you recommend starting with for complete beginners? I don't want to push too hard too fast.",
        timestamp: "1h 30m",
        metrics: {
          likes: 15,
          comments: 1,
          shares: 0
        }
      },
      {
        author: {
          firstName: "Mike",
          lastName: "Johnson",
          handle: "fitcoach",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
          verified: true
        },
        content: "@carlosr Always start with just your bodyweight to master the movement pattern first! Then add light weights - for most beginners, 10-15lbs dumbbells are perfect. Focus on form over weight every time!",
        timestamp: "1h 20m",
        metrics: {
          likes: 22,
          comments: 0,
          shares: 2
        }
      },
      {
        author: {
          firstName: "Emma",
          lastName: "Davis",
          handle: "nutritioncoach",
          avatar: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&h=400&fit=crop",
          verified: true,
          role: "admin" as const
        },
        content: "Love this content, Mike! Your clear instructions are so helpful. Would be great to collaborate on a nutrition + workout series sometime!",
        timestamp: "58m",
        metrics: {
          likes: 31,
          comments: 0,
          shares: 0
        }
      }
    ],
  },
  {
    index: 6,
    category: "nutrition",
    author: {
      firstName: "Sarah",
      lastName: "Chen",
      handle: "nutritionist",
      avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop",
      verified: true,
      role: "admin" as const,
    },
    content: "🥗 Meal prep tip: Prep your protein sources in bulk! Today I'm sharing my go-to high-protein meal prep that takes just 30 mins. Perfect for busy gym days when you need quick, nutritious meals. Swipe for the full recipe breakdown! #MealPrep #HealthyEating",
    timestamp: "3h",
    metrics: {
      likes: 428,
      comments: 67,
      shares: 51,
    },
    media: {
      type: "image" as const,
      url: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&h=400&fit=crop",
    },
  },
  {
    index: 7,
    category: "nutrition",
    author: {
      firstName: "Alex",
      lastName: "Rivera",
      handle: "macrocoach",
      avatar: "https://images.unsplash.com/photo-1548372290-8d01b6c8e78c?w=400&h=400&fit=crop",
      verified: true,
    },
    content: "👨‍🍳 Pre-workout nutrition doesn't have to be complicated! Here's my simple formula:\n\n• 1 banana 🍌\n• 1 tbsp almond butter\n• 1 scoop whey protein\n\nEat 45-60 mins before training for steady energy and great pumps! What's your go-to pre-workout meal?",
    timestamp: "6h",
    metrics: {
      likes: 752,
      comments: 89,
      shares: 12,
    },
  },
  {
    index: 8,
    category: "recovery",
    author: {
      firstName: "Maya",
      lastName: "Patel",
      handle: "recoverycoach",
      avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop",
      verified: true,
    },
    content: "🧊 Cold therapy guide! Just dropped a complete breakdown on ice baths vs. cold showers. Both have their place in recovery, but timing is everything. Check out the full guide on optimal temperatures and duration for different training phases.",
    timestamp: "4h",
    metrics: {
      likes: 634,
      comments: 72,
      shares: 45,
    },
    media: {
      type: "link" as const,
      url: "https://www.healthline.com/health/shoulder-pain-exercises",
      title: "Ice Bath vs Cold Shower: Complete Recovery Guide",
      domain: "healthline.com",
      thumbnail: "https://images.unsplash.com/photo-1563268093-a158621e3fc2?w=600&h=400&fit=crop",
    },
    replies: [
      {
        author: {
          firstName: "Alex",
          lastName: "Johnson",
          handle: "alexj",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
        },
        content: "This is incredibly helpful! I've been experimenting with both methods but wasn't sure about optimal timing. Do you think cold therapy is effective for muscle soreness from weight training?",
        timestamp: "3h 45m",
        metrics: {
          likes: 48,
          comments: 1,
          shares: 0
        }
      },
      {
        author: {
          firstName: "Maya",
          lastName: "Patel",
          handle: "recoverycoach",
          avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop",
          verified: true
        },
        content: "@alexj Absolutely! Cold therapy is excellent for reducing inflammation from weight training. For best results, wait 1-2 hours post-workout, then 10-15 minutes in cold water (50-59°F). This timing allows your body to initiate the recovery process while still getting the anti-inflammatory benefits!",
        timestamp: "3h 30m",
        metrics: {
          likes: 62,
          comments: 0,
          shares: 5
        }
      },
      {
        author: {
          firstName: "Sarah",
          lastName: "Johnson",
          handle: "gymlife",
          avatar: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop"
        },
        content: "I've been afraid to try ice baths because of how cold they are. Do you think starting with cold showers is a good way to ease into it?",
        timestamp: "2h 15m",
        metrics: {
          likes: 29,
          comments: 1,
          shares: 0
        }
      },
      {
        author: {
          firstName: "Maya",
          lastName: "Patel",
          handle: "recoverycoach",
          avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop",
          verified: true
        },
        content: "@gymlife Definitely! Cold showers are a perfect way to build tolerance. Start with 30 seconds of cool (not cold) water at the end of your normal shower, then gradually increase the duration and decrease the temperature. After a few weeks, you'll be ready to try an ice bath starting at 60°F for 3-5 minutes.",
        timestamp: "2h",
        metrics: {
          likes: 37,
          comments: 0,
          shares: 3
        }
      }
    ],
  },
  {
    index: 9,
    category: "recovery",
    author: {
      firstName: "Tom",
      lastName: "Wilson",
      handle: "sleepexpert",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop",
      verified: true,
    },
    content: "😴 Sleep is the ultimate recovery tool! New research shows that poor sleep can reduce muscle protein synthesis by up to 18%. Here are my top 3 tips for better sleep quality:\n\n1. No screens 1hr before bed\n2. Keep room temp at 65-68°F\n3. Consistent sleep/wake times\n\nWhat helps you sleep better?",
    timestamp: "2h",
    metrics: {
      likes: 891,
      comments: 134,
      shares: 89,
    },
  },
];

const PINNED_POST = {
  index: 999, // Adding a unique index for the pinned post
  pinned: true,
  category: "weight-training",
  author: {
    firstName: "David",
    lastName: "Johnson",
    handle: "davidj",
    avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop",
    verified: true,
    role: "founder" as const,
  },
  content: "👋 Welcome to our fitness community! Here's a quick guide to get you started:\n\n• Share your progress & achievements\n• Ask questions & support others\n• Join weekly challenges\n• Follow our community guidelines\n\nLet's crush our fitness goals together! 💪",
  timestamp: "2d",
  metrics: {
    likes: 1567,
    comments: 245,
    shares: 89,
  },
};

type SortOption = "latest" | "newest" | "oldest";

const Community = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [activeFilter, setActiveFilter] = useState("all");
  const [isPinned, setIsPinned] = useState(true);
  const [currentSort, setCurrentSort] = useState<SortOption>("newest");

  const filteredPosts = MOCK_POSTS.filter(post => 
    activeFilter === "all" || post.category === activeFilter
  );

  // Make sure all posts have valid index properties
  const postsWithIndices = filteredPosts.map((post, idx) => {
    // If post doesn't have an index property, assign one based on its position
    if (typeof post.index !== 'number') {
      return { ...post, index: 100 + idx }; // Use 100+ to avoid conflicts with existing indices
    }
    return post;
  });

  const sortedPosts = [...postsWithIndices].sort((a, b) => {
    switch (currentSort) {
      case "latest":
        // Sort by engagement (likes + comments)
        const engagementA = a.metrics.likes + a.metrics.comments;
        const engagementB = b.metrics.likes + b.metrics.comments;
        return engagementB - engagementA;
      case "newest":
        // For demo, using timestamp string comparison
        return b.timestamp.localeCompare(a.timestamp);
      case "oldest":
        // For demo, using timestamp string comparison
        return a.timestamp.localeCompare(b.timestamp);
      default:
        return 0;
    }
  });

  const handleUnpin = () => {
    setIsPinned(false);
  };

  const renderContent = () => {
    switch (currentPath) {
      case "/community":
        return (
          <>
            <CreatePost />
            <div className="space-y-4">
              {isPinned && <FeedPost {...PINNED_POST} onUnpin={handleUnpin} />}
              <div className="flex flex-col space-y-1">
                <SortOptions 
                  currentSort={currentSort}
                  onSortChange={setCurrentSort}
                />
                <div className="h-px bg-border w-full" />
              </div>
              {sortedPosts.map((post) => (
                <FeedPost key={post.index} {...post} />
            ))}
            </div>
          </>
        );
      case "/community/challenges":
      case "/community/meetups":
      case "/community/leaderboard":
        return (
          <div className="p-8 text-center text-muted-foreground">
            This is a webview
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <UIPreferencesProvider>
      <div className="flex flex-col flex-1">
      <CommunityHeader />
        <ConditionalCommunityTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <main>
        {renderContent()}
      </main>
    </div>
    </UIPreferencesProvider>
  );
};

export default Community;