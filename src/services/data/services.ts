import { CheckMethod, type ServiceDefinition } from '../abstract-service';

export const services: ServiceDefinition[] = [
  // Social Media
  { name: 'Instagram', url: 'https://www.instagram.com/{}/', category: 'Social Media', checkMethod: CheckMethod.BodyMatch, bodyMatch: '"pageID":"httpErrorPage"', testAvailableNick: 'oaskfofkda2123', testTakenNick: 'aleolek' },
  { name: 'Reddit', url: 'https://www.reddit.com/user/{}', category: 'Social Media', checkMethod: CheckMethod.BodyMatch, bodyMatch: 'Sorry, nobody on Reddit goes by that name.', testTakenNick: 'stosiu', testAvailableNick: 'oaskfofkda2123' },
  { name: 'Mastodon', url: 'https://mastodon.social/@{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'VK', url: 'https://vk.com/{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Twitch', url: 'https://m.twitch.tv/{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Pinterest', url: 'https://www.pinterest.com/{}/', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Tumblr', url: 'https://{}.tumblr.com', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Snapchat', url: 'https://www.snapchat.com/add/{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Threads', url: 'https://www.threads.net/@{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Bluesky', url: 'https://bsky.app/profile/{}.bsky.social', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Developer
  { name: 'GitHub', url: 'https://github.com/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'stosiu', testAvailableNick: 'stosiu32e2e2edwe' },
  { name: 'Bitbucket', url: 'https://bitbucket.org/{}/', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'DEV Community', url: 'https://dev.to/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Hacker News', url: 'https://news.ycombinator.com/user?id={}', category: 'Developer', checkMethod: CheckMethod.BodyMatch, bodyMatch: 'No such user.', testTakenNick: 'stosiu', testAvailableNick: 'stosiu32e2e2edwe' },
  { name: 'PyPI', url: 'https://pypi.org/user/{}/', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Hashnode', url: 'https://hashnode.com/@{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Replit', url: 'https://replit.com/@{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Kaggle', url: 'https://www.kaggle.com/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Gitee', url: 'https://gitee.com/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Coderwall', url: 'https://coderwall.com/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'devRant', url: 'https://devrant.com/users/{}', category: 'Developer', checkMethod: CheckMethod.BodyMatch, bodyMatch: 'Join a fun community of developers', testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'HackerOne', url: 'https://hackerone.com/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'SourceForge', url: 'https://sourceforge.net/u/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Docker Hub', url: 'https://hub.docker.com/u/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Crates.io', url: 'https://crates.io/users/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'RubyGems', url: 'https://rubygems.org/profiles/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Packagist', url: 'https://packagist.org/users/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Exercism', url: 'https://exercism.org/profiles/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'LeetCode', url: 'https://leetcode.com/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'CodeWars', url: 'https://www.codewars.com/users/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'HackerRank', url: 'https://www.hackerrank.com/profile/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Content & Blogging
  { name: 'Medium', url: 'https://medium.com/@{}', category: 'Content & Blogging', checkMethod: CheckMethod.BodyMatch, bodyMatch: 'Out of nothing, something.', testAvailableNick: 'oaskfofkda2123', testTakenNick: 'stosiu' },
  { name: 'Substack', url: 'https://{}.substack.com', category: 'Content & Blogging', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'WordPress', url: 'https://{}.wordpress.com/', category: 'Content & Blogging', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Blogspot', url: 'https://{}.blogspot.com', category: 'Content & Blogging', checkMethod: CheckMethod.Standard, testTakenNick: 'joseph', testAvailableNick: 'alex3232e2e2e' },
  { name: 'HubPages', url: 'https://hubpages.com/@{}', category: 'Content & Blogging', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'LiveJournal', url: 'https://{}.livejournal.com', category: 'Content & Blogging', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Scribd', url: 'https://www.scribd.com/{}', category: 'Content & Blogging', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'GoodReads', url: 'https://www.goodreads.com/{}', category: 'Content & Blogging', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Wattpad', url: 'https://www.wattpad.com/user/{}', category: 'Content & Blogging', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Creative & Design
  { name: 'Behance', url: 'https://www.behance.net/{}', category: 'Creative & Design', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Dribbble', url: 'https://dribbble.com/{}', category: 'Creative & Design', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'DeviantArt', url: 'https://www.deviantart.com/{}', category: 'Creative & Design', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Unsplash', url: 'https://unsplash.com/@{}', category: 'Creative & Design', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'VSCO', url: 'https://vsco.co/{}', category: 'Creative & Design', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Coroflot', url: 'https://www.coroflot.com/{}', category: 'Creative & Design', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Designspiration', url: 'https://www.designspiration.net/{}/', category: 'Creative & Design', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Crevado', url: 'https://{}.crevado.com', category: 'Creative & Design', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'ArtStation', url: 'https://www.artstation.com/{}', category: 'Creative & Design', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Figma', url: 'https://www.figma.com/@{}', category: 'Creative & Design', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Canva', url: 'https://www.canva.com/p/{}/', category: 'Creative & Design', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'CreativeMarket', url: 'https://creativemarket.com/users/{}', category: 'Creative & Design', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Redbubble', url: 'https://www.redbubble.com/people/{}', category: 'Creative & Design', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Music & Audio
  { name: 'SoundCloud', url: 'https://soundcloud.com/{}', category: 'Music & Audio', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Spotify', url: 'https://open.spotify.com/user/{}', category: 'Music & Audio', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Bandcamp', url: 'https://bandcamp.com/{}', category: 'Music & Audio', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Last.fm', url: 'https://last.fm/user/{}', category: 'Music & Audio', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'ReverbNation', url: 'https://www.reverbnation.com/{}', category: 'Music & Audio', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'House Mixes', url: 'https://www.house-mixes.com/profile/{}', category: 'Music & Audio', checkMethod: CheckMethod.BodyMatch, bodyMatch: 'Profile Not Found', testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Video & Streaming
  { name: 'DailyMotion', url: 'https://www.dailymotion.com/{}', category: 'Video & Streaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Vimeo', url: 'https://vimeo.com/{}', category: 'Video & Streaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Rumble', url: 'https://rumble.com/user/{}', category: 'Video & Streaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Odysee', url: 'https://odysee.com/@{}', category: 'Video & Streaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Gaming
  { name: 'Steam', url: 'https://steamcommunity.com/id/{}', category: 'Gaming', checkMethod: CheckMethod.BodyMatch, bodyMatch: 'The specified profile could not be found.', testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Steam Group', url: 'https://steamcommunity.com/groups/{}', category: 'Gaming', checkMethod: CheckMethod.BodyMatch, bodyMatch: 'No group could be retrieved for the given URL.', testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Kongregate', url: 'https://www.kongregate.com/accounts/{}', category: 'Gaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'MyAnimeList', url: 'https://myanimelist.net/profile/{}', category: 'Gaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Itch.io', url: 'https://{}.itch.io/', category: 'Gaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Star Citizen', url: 'https://robertsspaceindustries.com/citizens/{}', category: 'Gaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Chess.com', url: 'https://www.chess.com/member/{}', category: 'Gaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Roblox', url: 'https://www.roblox.com/user.aspx?username={}', category: 'Gaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Minecraft', url: 'https://namemc.com/profile/{}', category: 'Gaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Professional
  { name: 'Product Hunt', url: 'https://www.producthunt.com/@{}', category: 'Professional', checkMethod: CheckMethod.BodyMatch, bodyMatch: 'Product Hunt is a curation of the best new products', testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Quora', url: 'https://www.quora.com/profile/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'About.me', url: 'https://about.me/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Linktree', url: 'https://linktr.ee/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Gumroad', url: 'https://www.gumroad.com/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Patreon', url: 'https://www.patreon.com/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'juicyscoop', testAvailableNick: 'juicyscoop3232asdock' },
  { name: 'SlideShare', url: 'https://slideshare.net/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Academia.edu', url: 'https://independent.academia.edu/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Houzz', url: 'https://houzz.com/user/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Freelancer', url: 'https://www.freelancer.com/u/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Fiverr', url: 'https://www.fiverr.com/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Toptal', url: 'https://www.toptal.com/resume/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Buy Me a Coffee', url: 'https://buymeacoffee.com/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Community
  { name: 'Gravatar', url: 'http://en.gravatar.com/{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Disqus', url: 'https://disqus.com/{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'IFTTT', url: 'https://www.ifttt.com/p/{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Giphy', url: 'https://giphy.com/explore/{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'BuzzFeed', url: 'https://www.buzzfeed.com/{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Wikipedia', url: 'https://www.wikipedia.org/wiki/User:{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Instructables', url: 'https://www.instructables.com/member/{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Issuu', url: 'https://issuu.com/{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Letterboxd', url: 'https://letterboxd.com/{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Imgur', url: 'https://imgur.com/user/{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: '9GAG', url: 'https://9gag.com/u/{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Fandom', url: 'https://community.fandom.com/wiki/User:{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Finance & Crypto
  { name: 'TradingView', url: 'https://www.tradingview.com/u/{}/', category: 'Finance & Crypto', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Cash App', url: 'https://cash.me/{}', category: 'Finance & Crypto', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'CoinMarketCap', url: 'https://coinmarketcap.com/community/profile/{}', category: 'Finance & Crypto', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'OpenSea', url: 'https://opensea.io/{}', category: 'Finance & Crypto', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Messaging
  { name: 'Slack', url: 'https://{}.slack.com', category: 'Messaging', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Kik', url: 'https://ws2.kik.com/user/{}', category: 'Messaging', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Telegram', url: 'https://t.me/{}', category: 'Messaging', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Signal', url: 'https://signal.me/#p/{}', category: 'Messaging', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Education & Learning
  { name: 'Duolingo', url: 'https://www.duolingo.com/profile/{}', category: 'Education & Learning', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Khan Academy', url: 'https://www.khanacademy.org/profile/{}', category: 'Education & Learning', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Coursera', url: 'https://www.coursera.org/user/{}', category: 'Education & Learning', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Codecademy', url: 'https://www.codecademy.com/profiles/{}', category: 'Education & Learning', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Udemy', url: 'https://www.udemy.com/user/{}', category: 'Education & Learning', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Photography
  { name: 'Flickr', url: 'https://www.flickr.com/people/{}', category: 'Photography', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'YouPic', url: 'https://youpic.com/photographer/{}/', category: 'Photography', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'ImageShack', url: 'https://imageshack.us/user/{}', category: 'Photography', checkMethod: CheckMethod.BodyMatch, bodyMatch: 'ImageShack - Best place for all of your image hosting and image sharing needs', testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: '500px', url: 'https://500px.com/p/{}', category: 'Photography', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'EyeEm', url: 'https://www.eyeem.com/u/{}', category: 'Photography', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'ViewBug', url: 'https://www.viewbug.com/member/{}', category: 'Photography', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'SmugMug', url: 'https://{}.smugmug.com', category: 'Photography', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Additional Social Media
  { name: 'TikTok', url: 'https://www.tiktok.com/@{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Twitter', url: 'https://x.com/{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Facebook', url: 'https://www.facebook.com/{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'YouTube', url: 'https://www.youtube.com/@{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Ello', url: 'https://ello.co/{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Flipboard', url: 'https://flipboard.com/@{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Taringa', url: 'https://www.taringa.net/{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Gab', url: 'https://gab.com/{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Parler', url: 'https://parler.com/user/{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Coub', url: 'https://coub.com/{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Additional Developer
  { name: 'Glitch', url: 'https://glitch.com/@{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Codeberg', url: 'https://codeberg.org/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Observable', url: 'https://observablehq.com/@{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Additional Community
  { name: 'Hive', url: 'https://hive.blog/@{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Foursquare', url: 'https://foursquare.com/user/{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Additional Content & Blogging
  { name: 'Ghost', url: 'https://{}.ghost.io', category: 'Content & Blogging', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Telegraph', url: 'https://telegra.ph/{}', category: 'Content & Blogging', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Additional Gaming
  { name: 'Faceit', url: 'https://www.faceit.com/en/players/{}', category: 'Gaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Lichess', url: 'https://lichess.org/@/{}', category: 'Gaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Crunchyroll', url: 'https://www.crunchyroll.com/user/{}', category: 'Gaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Additional Music & Audio
  { name: 'Mixcloud', url: 'https://www.mixcloud.com/{}/', category: 'Music & Audio', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Additional Video & Streaming
  { name: 'BitChute', url: 'https://www.bitchute.com/channel/{}/', category: 'Video & Streaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Additional Professional
  { name: 'Calendly', url: 'https://calendly.com/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Contently', url: 'https://contently.com/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Codementor', url: 'https://www.codementor.io/@{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Marketplace & E-commerce
  { name: 'eBay', url: 'https://www.ebay.com/usr/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Security & Identity
  { name: 'Keybase', url: 'https://keybase.io/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Finance
  { name: 'Venmo', url: 'https://venmo.com/{}', category: 'Finance & Crypto', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Photography & Media
  { name: 'Carbonmade', url: 'https://{}.carbonmade.com', category: 'Creative & Design', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Developer (additional)
  { name: 'Pastebin', url: 'https://pastebin.com/u/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  // AI & ML
  { name: 'Hugging Face', url: 'https://huggingface.co/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },

  // Additional Developer
  { name: 'Wakatime', url: 'https://wakatime.com/@{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Lobsters', url: 'https://lobste.rs/u/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Hackster', url: 'https://www.hackster.io/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Additional Education & Learning
  { name: 'Scratch', url: 'https://scratch.mit.edu/users/{}', category: 'Education & Learning', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Additional Music & Audio
  { name: 'Genius', url: 'https://genius.com/{}', category: 'Music & Audio', checkMethod: CheckMethod.Standard, testTakenNick: 'Eminem', testAvailableNick: 'alex3232e2e2e' },

  // Additional Creative & Design
  { name: 'Sketchfab', url: 'https://sketchfab.com/{}', category: 'Creative & Design', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Additional Professional
  { name: 'SpeakerDeck', url: 'https://speakerdeck.com/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Credly', url: 'https://www.credly.com/users/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'AllMyLinks', url: 'https://allmylinks.com/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Open Collective', url: 'https://opencollective.com/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Additional Social Media
  { name: 'Myspace', url: 'https://myspace.com/{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Additional Community
  { name: 'Grailed', url: 'https://www.grailed.com/{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Developer (additional batch)
  { name: 'GitLab', url: 'https://gitlab.com/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'npm', url: 'https://www.npmjs.com/~{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Codeforces', url: 'https://codeforces.com/profile/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'CodeChef', url: 'https://www.codechef.com/users/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'AtCoder', url: 'https://atcoder.jp/users/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'tourist', testAvailableNick: 'alex3232e2e2e' },
  { name: 'TryHackMe', url: 'https://tryhackme.com/p/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'HackTheBox', url: 'https://forum.hackthebox.com/u/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/user/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Crowdin', url: 'https://crowdin.com/profile/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Social Media (additional batch)
  { name: 'Clubhouse', url: 'https://www.clubhouse.com/@{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  // Gaming (additional batch)
  { name: 'osu!', url: 'https://osu.ppy.sh/users/{}', category: 'Gaming', checkMethod: CheckMethod.Standard, testTakenNick: 'peppy', testAvailableNick: 'alex3232e2e2e' },
  { name: 'BoardGameGeek', url: 'https://boardgamegeek.com/user/{}', category: 'Gaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'PSN Profiles', url: 'https://psnprofiles.com/{}', category: 'Gaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'AniList', url: 'https://anilist.co/user/{}/', category: 'Gaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'TETR.IO', url: 'https://ch.tetr.io/u/{}', category: 'Gaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Music & Audio (additional batch)
  { name: 'Discogs', url: 'https://www.discogs.com/user/{}', category: 'Music & Audio', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'MuseScore', url: 'https://musescore.com/user/{}', category: 'Music & Audio', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Professional (additional batch)
  { name: 'Ko-fi', url: 'https://ko-fi.com/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Cameo', url: 'https://www.cameo.com/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'snoopdogg', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Beacons', url: 'https://beacons.ai/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Carrd', url: 'https://{}.carrd.co', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Bio.link', url: 'https://bio.link/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Bento', url: 'https://bento.me/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Marketplace
  { name: 'Depop', url: 'https://www.depop.com/{}/', category: 'Marketplace', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Content & Blogging (additional batch)
  { name: 'Archive.org', url: 'https://archive.org/details/@{}', category: 'Content & Blogging', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Education & Learning (additional batch)
  { name: 'freeCodeCamp', url: 'https://www.freecodecamp.org/{}', category: 'Education & Learning', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Memrise', url: 'https://www.memrise.com/user/{}/', category: 'Education & Learning', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Video & Streaming (additional batch)
  { name: 'Trovo', url: 'https://trovo.live/s/{}', category: 'Video & Streaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Fitness & Sports
  { name: 'Strava', url: 'https://www.strava.com/athletes/{}', category: 'Fitness & Sports', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Additional Social Media
  { name: 'Mastodon.online', url: 'https://mastodon.online/@{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'admin', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Pixelfed', url: 'https://pixelfed.social/{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'admin', testAvailableNick: 'alex3232e2e2e' },
  { name: 'CounterSocial', url: 'https://counter.social/@{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'th3j35t3r', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Lemmy.ml', url: 'https://lemmy.ml/u/{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'admin', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Misskey.io', url: 'https://misskey.io/@{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'admin', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Truth Social', url: 'https://truthsocial.com/@{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'realDonaldTrump', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Gettr', url: 'https://gettr.com/user/{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'admin', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Plurk', url: 'https://www.plurk.com/{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Hubzilla', url: 'https://hubzilla.org/channel/{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'admin', testAvailableNick: 'alex3232e2e2e' },

  // Additional Developer
  { name: 'npm Package', url: 'https://www.npmjs.com/package/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'react', testAvailableNick: 'alex3232e2e2e' },
  { name: 'CodeSandbox', url: 'https://codesandbox.io/u/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'StackBlitz', url: 'https://stackblitz.com/@{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Launchpad', url: 'https://launchpad.net/~{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'OpenHub', url: 'https://openhub.net/accounts/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Repl.it', url: 'https://repl.it/@{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Libraries.io', url: 'https://libraries.io/github/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Pub.dev', url: 'https://pub.dev/publishers/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'google.dev', testAvailableNick: 'alex3232e2e2e' },
  { name: 'CoCalc', url: 'https://cocalc.com/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Hex.pm', url: 'https://hex.pm/users/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Gitea', url: 'https://gitea.com/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Sourcehut', url: 'https://sr.ht/~{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'sircmpwn', testAvailableNick: 'alex3232e2e2e' },
  { name: 'NotABug', url: 'https://notabug.org/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'admin', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Bugcrowd', url: 'https://bugcrowd.com/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Additional Gaming
  { name: 'GOG.com', url: 'https://www.gog.com/u/{}', category: 'Gaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'RetroAchievements', url: 'https://retroachievements.org/user/{}', category: 'Gaming', checkMethod: CheckMethod.Standard, testTakenNick: 'Scott', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Tabletopia', url: 'https://tabletopia.com/users/{}', category: 'Gaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Grouvee', url: 'https://www.grouvee.com/user/{}/', category: 'Gaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Backloggd', url: 'https://www.backloggd.com/u/{}/', category: 'Gaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'RAWG', url: 'https://rawg.io/@{}', category: 'Gaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Nexus Mods', url: 'https://www.nexusmods.com/users/{}', category: 'Gaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Modrinth', url: 'https://modrinth.com/user/{}', category: 'Gaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'CurseForge', url: 'https://www.curseforge.com/members/{}', category: 'Gaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'GameBanana', url: 'https://gamebanana.com/members/{}', category: 'Gaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Marketplace
  { name: 'Shopify', url: 'https://{}.myshopify.com', category: 'Marketplace', checkMethod: CheckMethod.Standard, testTakenNick: 'apple', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Poshmark', url: 'https://poshmark.com/closet/{}', category: 'Marketplace', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Envato', url: 'https://codecanyon.net/user/{}', category: 'Marketplace', checkMethod: CheckMethod.Standard, testTakenNick: 'developer', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Society6', url: 'https://society6.com/{}', category: 'Marketplace', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Zazzle', url: 'https://www.zazzle.com/store/{}', category: 'Marketplace', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Teespring', url: 'https://www.teespring.com/stores/{}', category: 'Marketplace', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Storenvy', url: 'https://{}.storenvy.com', category: 'Marketplace', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'BigCartel', url: 'https://{}.bigcartel.com', category: 'Marketplace', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Food & Lifestyle
  { name: 'Untappd', url: 'https://untappd.com/user/{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'TripAdvisor', url: 'https://www.tripadvisor.com/Profile/{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'AllTrails', url: 'https://www.alltrails.com/members/{}', category: 'Fitness & Sports', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Vivino', url: 'https://www.vivino.com/users/{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Additional Professional
  { name: 'Wellfound', url: 'https://wellfound.com/u/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Polywork', url: 'https://www.polywork.com/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Contra', url: 'https://contra.com/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Lnk.Bio', url: 'https://lnk.bio/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Taplink', url: 'https://taplink.cc/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Notion', url: 'https://{}.notion.site', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Read.cv', url: 'https://read.cv/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Hashnode Blog', url: 'https://{}.hashnode.dev', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Peerlist', url: 'https://peerlist.io/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Daily.dev', url: 'https://app.daily.dev/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Additional Music & Audio
  { name: 'Rate Your Music', url: 'https://rateyourmusic.com/~{}', category: 'Music & Audio', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Setlist.fm', url: 'https://www.setlist.fm/user/{}', category: 'Music & Audio', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Deezer', url: 'https://www.deezer.com/profile/{}', category: 'Music & Audio', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Additional Community
  { name: 'Ask.fm', url: 'https://ask.fm/{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Wikimedia', url: 'https://meta.wikimedia.org/wiki/User:{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'Alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Trello', url: 'https://trello.com/{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Goodreads Author', url: 'https://www.goodreads.com/author/show/{}', category: 'Content & Blogging', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'LibraryThing', url: 'https://www.librarything.com/profile/{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Mastodon.world', url: 'https://mastodon.world/@{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'admin', testAvailableNick: 'alex3232e2e2e' },

  // AI & ML
  { name: 'Replicate', url: 'https://replicate.com/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'stability-ai', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Weights & Biases', url: 'https://wandb.ai/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'wandb', testAvailableNick: 'alex3232e2e2e' },
  { name: 'CivitAI', url: 'https://civitai.com/user/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Additional Creative & Design
  { name: 'Threadless', url: 'https://www.threadless.com/@{}', category: 'Creative & Design', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Pixiv', url: 'https://www.pixiv.net/users/{}', category: 'Creative & Design', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Artfol', url: 'https://artfol.co/{}', category: 'Creative & Design', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Cara', url: 'https://cara.app/{}', category: 'Creative & Design', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Drawcrowd', url: 'https://drawcrowd.com/{}', category: 'Creative & Design', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Additional Content & Blogging
  { name: 'Write.as', url: 'https://write.as/{}', category: 'Content & Blogging', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Bear Blog', url: 'https://{}.bearblog.dev', category: 'Content & Blogging', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Micro.blog', url: 'https://micro.blog/{}', category: 'Content & Blogging', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Neocities', url: 'https://neocities.org/site/{}', category: 'Content & Blogging', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Tumblelog', url: 'https://www.tumblelog.com/{}', category: 'Content & Blogging', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Podcasting
  { name: 'Podbean', url: 'https://{}.podbean.com', category: 'Music & Audio', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Anchor', url: 'https://anchor.fm/{}', category: 'Music & Audio', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Podomatic', url: 'https://www.podomatic.com/podcasts/{}', category: 'Music & Audio', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Additional Finance & Crypto
  { name: 'Coinbase', url: 'https://www.coinbase.com/{}', category: 'Finance & Crypto', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Rarible', url: 'https://rarible.com/{}', category: 'Finance & Crypto', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Foundation', url: 'https://foundation.app/@{}', category: 'Finance & Crypto', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Mirror', url: 'https://mirror.xyz/{}', category: 'Finance & Crypto', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Zora', url: 'https://zora.co/{}', category: 'Finance & Crypto', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Additional Education & Learning
  { name: 'Skillshare', url: 'https://www.skillshare.com/profile/{}', category: 'Education & Learning', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Brilliant', url: 'https://brilliant.org/profile/{}/', category: 'Education & Learning', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Brainly', url: 'https://brainly.com/profile/{}', category: 'Education & Learning', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Quizlet', url: 'https://quizlet.com/{}', category: 'Education & Learning', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Sololearn', url: 'https://www.sololearn.com/profile/{}', category: 'Education & Learning', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Additional Photography
  { name: 'Photobucket', url: 'https://photobucket.com/u/{}', category: 'Photography', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Glass', url: 'https://glass.photo/{}', category: 'Photography', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Vero', url: 'https://vero.co/{}', category: 'Photography', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Additional Fitness & Sports
  { name: 'Komoot', url: 'https://www.komoot.com/user/{}', category: 'Fitness & Sports', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'TrainingPeaks', url: 'https://www.trainingpeaks.com/athlete/{}', category: 'Fitness & Sports', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Peloton', url: 'https://members.onepeloton.com/members/{}', category: 'Fitness & Sports', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Additional Video & Streaming
  { name: 'PeerTube', url: 'https://peertube.tv/accounts/{}', category: 'Video & Streaming', checkMethod: CheckMethod.Standard, testTakenNick: 'admin', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Nebula', url: 'https://nebula.tv/{}', category: 'Video & Streaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Loom', url: 'https://www.loom.com/share/{}', category: 'Video & Streaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Additional Messaging
  { name: 'Discord', url: 'https://discord.com/invite/{}', category: 'Messaging', checkMethod: CheckMethod.Standard, testTakenNick: 'discord', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Matrix', url: 'https://matrix.to/#/@{}:matrix.org', category: 'Messaging', checkMethod: CheckMethod.Standard, testTakenNick: 'admin', testAvailableNick: 'alex3232e2e2e' },

  // Writing & Reading
  { name: 'Royal Road', url: 'https://www.royalroad.com/profile/{}', category: 'Content & Blogging', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Additional Community
  { name: 'Lemmy.world', url: 'https://lemmy.world/u/{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'admin', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Tildes', url: 'https://tildes.net/user/{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Cohost', url: 'https://cohost.org/{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'staff', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Minds', url: 'https://www.minds.com/{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'ottman', testAvailableNick: 'alex3232e2e2e' },

  // Hosting & Platforms
  { name: 'Vercel', url: 'https://vercel.com/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'vercel', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Render', url: 'https://{}.onrender.com', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Heroku', url: 'https://{}.herokuapp.com', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'api', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Netlify', url: 'https://{}.netlify.app', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'app', testAvailableNick: 'alex3232e2e2e' },
  { name: 'GitHub Pages', url: 'https://{}.github.io', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Fly.io', url: 'https://{}.fly.dev', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'api', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Railway', url: 'https://{}.up.railway.app', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'api', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Surge', url: 'https://{}.surge.sh', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Webflow', url: 'https://{}.webflow.io', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // More Social Media
  { name: 'Diaspora', url: 'https://diaspora.social/people/{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Friendica', url: 'https://friendica.world/profile/{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'admin', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Funkwhale', url: 'https://open.audio/@{}', category: 'Music & Audio', checkMethod: CheckMethod.Standard, testTakenNick: 'admin', testAvailableNick: 'alex3232e2e2e' },

  // More Developer
  { name: 'Postman', url: 'https://www.postman.com/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Bower', url: 'https://bower.io/search/?q={}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'jquery', testAvailableNick: 'alex3232e2e2e' },
  { name: 'CPAN', url: 'https://metacpan.org/author/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'RJBS', testAvailableNick: 'alex3232e2e2e' },
  { name: 'AUR', url: 'https://aur.archlinux.org/account/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'OpenStreetMap', url: 'https://www.openstreetmap.org/user/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Conan.io', url: 'https://conan.io/center/recipes/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'boost', testAvailableNick: 'alex3232e2e2e' },
  { name: 'F-Droid', url: 'https://f-droid.org/packages/{}/', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'org.mozilla.firefox', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Homebrew', url: 'https://formulae.brew.sh/formula/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'git', testAvailableNick: 'alex3232e2e2e' },

  // More Gaming
  { name: 'GGn Profile', url: 'https://gazellegames.net/user.php?action=profile&name={}', category: 'Gaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Roblox Group', url: 'https://www.roblox.com/groups/{}', category: 'Gaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Smashboards', url: 'https://smashboards.com/members/{}', category: 'Gaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Lolchess', url: 'https://lolchess.gg/profile/na/{}', category: 'Gaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Playstv', url: 'https://plays.tv/u/{}', category: 'Gaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // More Marketplace
  { name: 'Gumroad Store', url: 'https://{}.gumroad.com', category: 'Marketplace', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Sellfy', url: 'https://sellfy.com/{}', category: 'Marketplace', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Paddle', url: 'https://{}.paddle.com', category: 'Marketplace', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'LemonSqueezy', url: 'https://{}.lemonsqueezy.com', category: 'Marketplace', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // More Community
  { name: 'Meetup', url: 'https://www.meetup.com/members/{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Reddit Sub', url: 'https://www.reddit.com/r/{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'programming', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Amino', url: 'https://aminoapps.com/u/{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Voat', url: 'https://voat.co/user/{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Saidit', url: 'https://saidit.net/user/{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'admin', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Raddle', url: 'https://raddle.me/user/{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'admin', testAvailableNick: 'alex3232e2e2e' },

  // More Professional
  { name: 'Upwork', url: 'https://www.upwork.com/freelancers/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Topmate', url: 'https://topmate.io/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Superpeer', url: 'https://superpeer.com/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Cal.com', url: 'https://cal.com/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Savee', url: 'https://savee.it/{}/', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Wix', url: 'https://{}.wixsite.com', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Squarespace', url: 'https://{}.squarespace.com', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // More Content & Blogging
  { name: 'Penzu', url: 'https://penzu.com/public/{}', category: 'Content & Blogging', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Vocal', url: 'https://vocal.media/authors/{}', category: 'Content & Blogging', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Svbtle', url: 'https://{}.svbtle.com', category: 'Content & Blogging', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Typeshare', url: 'https://typeshare.co/{}', category: 'Content & Blogging', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // More Video & Streaming
  { name: 'YouNow', url: 'https://www.younow.com/{}', category: 'Video & Streaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // More Finance & Crypto
  { name: 'LooksRare', url: 'https://looksrare.org/accounts/{}', category: 'Finance & Crypto', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Blur', url: 'https://blur.io/{}', category: 'Finance & Crypto', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // More Creative & Design
  { name: 'Dribble Shot', url: 'https://dribbble.com/shots/{}', category: 'Creative & Design', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Awwwards', url: 'https://www.awwwards.com/{}/', category: 'Creative & Design', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Layers', url: 'https://layers.to/{}', category: 'Creative & Design', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // More Education & Learning
  { name: 'Pluralsight', url: 'https://app.pluralsight.com/profile/{}', category: 'Education & Learning', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Treehouse', url: 'https://teamtreehouse.com/{}', category: 'Education & Learning', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'DataCamp', url: 'https://www.datacamp.com/profile/{}', category: 'Education & Learning', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Edx', url: 'https://profile.edx.org/{}', category: 'Education & Learning', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // More Photography
  { name: 'GuruShots', url: 'https://gurushots.com/{}', category: 'Photography', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Domain Names (DNS-over-HTTPS via Cloudflare)
  { name: '.com', url: 'https://cloudflare-dns.com/dns-query?name={}.com&type=A', category: 'Domain Names', checkMethod: CheckMethod.DNS, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.org', url: 'https://cloudflare-dns.com/dns-query?name={}.org&type=A', category: 'Domain Names', checkMethod: CheckMethod.DNS, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.net', url: 'https://cloudflare-dns.com/dns-query?name={}.net&type=A', category: 'Domain Names', checkMethod: CheckMethod.DNS, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.io', url: 'https://cloudflare-dns.com/dns-query?name={}.io&type=A', category: 'Domain Names', checkMethod: CheckMethod.DNS, testTakenNick: 'github', testAvailableNick: 'alex3232e2e2e' },
  { name: '.co', url: 'https://cloudflare-dns.com/dns-query?name={}.co&type=A', category: 'Domain Names', checkMethod: CheckMethod.DNS, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.dev', url: 'https://cloudflare-dns.com/dns-query?name={}.dev&type=A', category: 'Domain Names', checkMethod: CheckMethod.DNS, testTakenNick: 'web', testAvailableNick: 'alex3232e2e2e' },
  { name: '.app', url: 'https://cloudflare-dns.com/dns-query?name={}.app&type=A', category: 'Domain Names', checkMethod: CheckMethod.DNS, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.me', url: 'https://cloudflare-dns.com/dns-query?name={}.me&type=A', category: 'Domain Names', checkMethod: CheckMethod.DNS, testTakenNick: 'about', testAvailableNick: 'alex3232e2e2e' },
  { name: '.xyz', url: 'https://cloudflare-dns.com/dns-query?name={}.xyz&type=A', category: 'Domain Names', checkMethod: CheckMethod.DNS, testTakenNick: 'abc', testAvailableNick: 'alex3232e2e2e' },
  { name: '.ai', url: 'https://cloudflare-dns.com/dns-query?name={}.ai&type=A', category: 'Domain Names', checkMethod: CheckMethod.DNS, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.gg', url: 'https://cloudflare-dns.com/dns-query?name={}.gg&type=A', category: 'Domain Names', checkMethod: CheckMethod.DNS, testTakenNick: 'discord', testAvailableNick: 'alex3232e2e2e' },
  { name: '.tv', url: 'https://cloudflare-dns.com/dns-query?name={}.tv&type=A', category: 'Domain Names', checkMethod: CheckMethod.DNS, testTakenNick: 'twitch', testAvailableNick: 'alex3232e2e2e' },
  { name: '.fm', url: 'https://cloudflare-dns.com/dns-query?name={}.fm&type=A', category: 'Domain Names', checkMethod: CheckMethod.DNS, testTakenNick: 'last', testAvailableNick: 'alex3232e2e2e' },
  { name: '.us', url: 'https://cloudflare-dns.com/dns-query?name={}.us&type=A', category: 'Domain Names', checkMethod: CheckMethod.DNS, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.cc', url: 'https://cloudflare-dns.com/dns-query?name={}.cc&type=A', category: 'Domain Names', checkMethod: CheckMethod.DNS, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.biz', url: 'https://cloudflare-dns.com/dns-query?name={}.biz&type=A', category: 'Domain Names', checkMethod: CheckMethod.DNS, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.info', url: 'https://cloudflare-dns.com/dns-query?name={}.info&type=A', category: 'Domain Names', checkMethod: CheckMethod.DNS, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.de', url: 'https://cloudflare-dns.com/dns-query?name={}.de&type=A', category: 'Domain Names', checkMethod: CheckMethod.DNS, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.eu', url: 'https://cloudflare-dns.com/dns-query?name={}.eu&type=A', category: 'Domain Names', checkMethod: CheckMethod.DNS, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.uk', url: 'https://cloudflare-dns.com/dns-query?name={}.uk&type=A', category: 'Domain Names', checkMethod: CheckMethod.DNS, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.ca', url: 'https://cloudflare-dns.com/dns-query?name={}.ca&type=A', category: 'Domain Names', checkMethod: CheckMethod.DNS, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.in', url: 'https://cloudflare-dns.com/dns-query?name={}.in&type=A', category: 'Domain Names', checkMethod: CheckMethod.DNS, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.mobi', url: 'https://cloudflare-dns.com/dns-query?name={}.mobi&type=A', category: 'Domain Names', checkMethod: CheckMethod.DNS, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.ws', url: 'https://cloudflare-dns.com/dns-query?name={}.ws&type=A', category: 'Domain Names', checkMethod: CheckMethod.DNS, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.ee', url: 'https://cloudflare-dns.com/dns-query?name={}.ee&type=A', category: 'Domain Names', checkMethod: CheckMethod.DNS, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.at', url: 'https://cloudflare-dns.com/dns-query?name={}.at&type=A', category: 'Domain Names', checkMethod: CheckMethod.DNS, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.ru', url: 'https://cloudflare-dns.com/dns-query?name={}.ru&type=A', category: 'Domain Names', checkMethod: CheckMethod.DNS, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.jp', url: 'https://cloudflare-dns.com/dns-query?name={}.jp&type=A', category: 'Domain Names', checkMethod: CheckMethod.DNS, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.cn', url: 'https://cloudflare-dns.com/dns-query?name={}.cn&type=A', category: 'Domain Names', checkMethod: CheckMethod.DNS, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.do', url: 'https://cloudflare-dns.com/dns-query?name={}.do&type=A', category: 'Domain Names', checkMethod: CheckMethod.DNS, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
];
