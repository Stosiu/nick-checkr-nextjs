import { CheckMethod, UnverifiableReason, type ServiceDefinition } from '../abstract-service';

export const services: ServiceDefinition[] = [
  // Social Media
  { name: 'Instagram', url: 'https://www.instagram.com/{}/', category: 'Social Media', checkMethod: CheckMethod.BodyMatch, bodyMatch: '"pageID":"httpErrorPage"', testAvailableNick: 'oaskfofkda2123', testTakenNick: 'aleolek' },
  { name: 'Reddit', url: 'https://www.reddit.com/user/{}', category: 'Social Media', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.BotProtected, testTakenNick: 'stosiu', testAvailableNick: 'oaskfofkda2123' },
  { name: 'Mastodon', url: 'https://mastodon.social/@{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'VK', url: 'https://vk.com/{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Twitch', url: 'https://www.twitch.tv/{}', category: 'Social Media', checkMethod: CheckMethod.NickInTitle, testTakenNick: 'ninja', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Pinterest', url: 'https://www.pinterest.com/{}/', category: 'Social Media', checkMethod: CheckMethod.BodyMatch, bodyMatch: 'User not found', testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Tumblr', url: 'https://{}.tumblr.com', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Snapchat', url: 'https://www.snapchat.com/add/{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Threads', url: 'https://www.threads.net/@{}', category: 'Social Media', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Bluesky', url: 'https://bsky.app/profile/{}.bsky.social', category: 'Social Media', checkMethod: CheckMethod.NickInTitle, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Developer
  { name: 'GitHub', url: 'https://github.com/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'stosiu', testAvailableNick: 'stosiu32e2e2edwe' },
  { name: 'Bitbucket', url: 'https://bitbucket.org/{}/', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'support', testAvailableNick: 'alex3232e2e2e' },
  { name: 'DEV Community', url: 'https://dev.to/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Hacker News', url: 'https://news.ycombinator.com/user?id={}', category: 'Developer', checkMethod: CheckMethod.BodyMatch, bodyMatch: 'No such user.', testTakenNick: 'stosiu', testAvailableNick: 'stosiu32e2e2edwe' },
  { name: 'PyPI', url: 'https://pypi.org/user/{}/', category: 'Developer', checkMethod: CheckMethod.NickInTitle, testTakenNick: 'dstufft', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Hashnode', url: 'https://hashnode.com/@{}', category: 'Developer', checkMethod: CheckMethod.BodyMatch, bodyMatch: 'User not found', testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Replit', url: 'https://replit.com/@{}', category: 'Developer', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Kaggle', url: 'https://www.kaggle.com/{}', category: 'Developer', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Gitee', url: 'https://gitee.com/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Coderwall', url: 'https://coderwall.com/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'devRant', url: 'https://devrant.com/users/{}', category: 'Developer', checkMethod: CheckMethod.BodyMatch, bodyMatch: 'Join a fun community of developers', testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'HackerOne', url: 'https://hackerone.com/{}', category: 'Security & Bug Bounty', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'SourceForge', url: 'https://sourceforge.net/u/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Docker Hub', url: 'https://hub.docker.com/u/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Crates.io', url: 'https://crates.io/users/{}', apiUrl: 'https://crates.io/api/v1/users/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'carols10cents', testAvailableNick: 'zqvx8841mkw' },
  { name: 'RubyGems', url: 'https://rubygems.org/profiles/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Packagist', url: 'https://packagist.org/users/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Exercism', url: 'https://exercism.org/profiles/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'LeetCode', url: 'https://leetcode.com/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'CodeWars', url: 'https://www.codewars.com/users/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'HackerRank', url: 'https://www.hackerrank.com/profile/{}', category: 'Developer', checkMethod: CheckMethod.BodyMatch, bodyMatch: 'Programming Problems and Competitions :: HackerRank', testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Content & Blogging
  { name: 'Medium', url: 'https://medium.com/@{}', category: 'Content & Blogging', checkMethod: CheckMethod.BodyMatch, bodyMatch: 'Out of nothing, something.', testAvailableNick: 'oaskfofkda2123', testTakenNick: 'stosiu' },
  { name: 'Substack', url: 'https://{}.substack.com', category: 'Newsletters', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'WordPress', url: 'https://{}.wordpress.com/', category: 'Content & Blogging', checkMethod: CheckMethod.NickInTitle, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Blogspot', url: 'https://{}.blogspot.com', category: 'Content & Blogging', checkMethod: CheckMethod.Standard, testTakenNick: 'admin', testAvailableNick: 'alex3232e2e2e' },
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
  { name: 'ArtStation', url: 'https://www.artstation.com/{}', category: 'Creative & Design', checkMethod: CheckMethod.BodyMatch, bodyMatch: 'ArtStation - Explore', testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Figma', url: 'https://www.figma.com/@{}', category: 'Creative & Design', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Canva', url: 'https://www.canva.com/p/{}/', category: 'Creative & Design', checkMethod: CheckMethod.Standard, testTakenNick: 'canva', testAvailableNick: 'alex3232e2e2e' },
  { name: 'CreativeMarket', url: 'https://creativemarket.com/users/{}', category: 'Creative & Design', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Redbubble', url: 'https://www.redbubble.com/people/{}', category: 'Creative & Design', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Music & Audio
  { name: 'SoundCloud', url: 'https://soundcloud.com/{}', category: 'Music & Audio', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Spotify', url: 'https://open.spotify.com/user/{}', category: 'Music & Audio', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Bandcamp', url: 'https://bandcamp.com/{}', category: 'Music & Audio', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Last.fm', url: 'https://last.fm/user/{}', category: 'Music & Audio', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'ReverbNation', url: 'https://www.reverbnation.com/{}', category: 'Music & Audio', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'House Mixes', url: 'https://www.house-mixes.com/profile/{}', category: 'Music & Audio', checkMethod: CheckMethod.BodyMatch, bodyMatch: 'Not Found', testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Video & Streaming
  { name: 'DailyMotion', url: 'https://www.dailymotion.com/{}', apiUrl: 'https://api.dailymotion.com/user/{}', category: 'Video & Streaming', checkMethod: CheckMethod.Standard, testTakenNick: 'dailymotion', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Vimeo', url: 'https://vimeo.com/{}', category: 'Video & Streaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Rumble', url: 'https://rumble.com/user/{}', category: 'Video & Streaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Odysee', url: 'https://odysee.com/@{}', category: 'Video & Streaming', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Gaming
  { name: 'Steam', url: 'https://steamcommunity.com/id/{}', category: 'Gaming', checkMethod: CheckMethod.BodyMatch, bodyMatch: 'The specified profile could not be found.', testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Steam Group', url: 'https://steamcommunity.com/groups/{}', category: 'Gaming', checkMethod: CheckMethod.BodyMatch, bodyMatch: 'No group could be retrieved for the given URL.', testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Kongregate', url: 'https://www.kongregate.com/accounts/{}', category: 'Gaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'MyAnimeList', url: 'https://myanimelist.net/profile/{}', category: 'Gaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Itch.io', url: 'https://{}.itch.io/', category: 'Gaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Star Citizen', url: 'https://robertsspaceindustries.com/citizens/{}', category: 'Gaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Chess.com', url: 'https://www.chess.com/member/{}', category: 'Gaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Roblox', url: 'https://www.roblox.com/user.aspx?username={}', category: 'Gaming', checkMethod: CheckMethod.Standard, testTakenNick: 'roblox', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Minecraft', url: 'https://namemc.com/profile/{}', apiUrl: 'https://api.mojang.com/users/profiles/minecraft/{}', category: 'Gaming', checkMethod: CheckMethod.Standard, testTakenNick: 'Notch', testAvailableNick: 'zqvx8841mkw' },

  // Professional
  { name: 'Product Hunt', url: 'https://www.producthunt.com/@{}', category: 'Professional', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.BotProtected, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'About.me', url: 'https://about.me/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Linktree', url: 'https://linktr.ee/{}', category: 'Link in Bio', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Gumroad', url: 'https://www.gumroad.com/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Patreon', url: 'https://www.patreon.com/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'juicyscoop', testAvailableNick: 'juicyscoop3232asdock' },
  { name: 'SlideShare', url: 'https://slideshare.net/{}', category: 'Professional', checkMethod: CheckMethod.NickInTitle, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Academia.edu', url: 'https://independent.academia.edu/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Houzz', url: 'https://houzz.com/user/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Freelancer', url: 'https://www.freelancer.com/u/{}', category: 'Professional', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Fiverr', url: 'https://www.fiverr.com/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Toptal', url: 'https://www.toptal.com/resume/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testAvailableNick: 'alex3232e2e2e' },
  { name: 'Buy Me a Coffee', url: 'https://buymeacoffee.com/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'admin', testAvailableNick: 'alex3232e2e2e' },

  // Community
  { name: 'Gravatar', url: 'http://en.gravatar.com/{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Disqus', url: 'https://disqus.com/{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'IFTTT', url: 'https://www.ifttt.com/p/{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Giphy', url: 'https://giphy.com/explore/{}', category: 'Community', checkMethod: CheckMethod.NickInTitle, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'BuzzFeed', url: 'https://www.buzzfeed.com/{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Wikipedia', url: 'https://www.wikipedia.org/wiki/User:{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Instructables', url: 'https://www.instructables.com/member/{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Issuu', url: 'https://issuu.com/{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Letterboxd', url: 'https://letterboxd.com/{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Imgur', url: 'https://imgur.com/user/{}', apiUrl: 'https://api.imgur.com/account/v1/accounts/{}?client_id=546c25a59c58ad7', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'imgur', testAvailableNick: 'zqvx8841mkw' },
  { name: '9GAG', url: 'https://9gag.com/u/{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Fandom', url: 'https://community.fandom.com/wiki/User:{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Finance & Crypto
  { name: 'TradingView', url: 'https://www.tradingview.com/u/{}/', category: 'Finance & Crypto', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Cash App', url: 'https://cash.me/{}', category: 'Finance & Crypto', checkMethod: CheckMethod.Standard, testTakenNick: 'support', testAvailableNick: 'alex3232e2e2e' },
  { name: 'CoinMarketCap', url: 'https://coinmarketcap.com/community/profile/{}', category: 'Finance & Crypto', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.BotProtected, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'OpenSea', url: 'https://opensea.io/{}', category: 'Finance & Crypto', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Messaging
  { name: 'Slack', url: 'https://{}.slack.com', category: 'Messaging', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Kik', url: 'https://ws2.kik.com/user/{}', category: 'Messaging', checkMethod: CheckMethod.Standard, testAvailableNick: 'alex3232e2e2e' },
  { name: 'Telegram', url: 'https://t.me/{}', category: 'Messaging', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Signal', url: 'https://signal.me/#p/{}', category: 'Messaging', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Education & Learning
  { name: 'Duolingo', url: 'https://www.duolingo.com/profile/{}', category: 'Education & Learning', checkMethod: CheckMethod.NickInOgTitle, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Khan Academy', url: 'https://www.khanacademy.org/profile/{}', category: 'Education & Learning', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Coursera', url: 'https://www.coursera.org/user/{}', category: 'Education & Learning', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Codecademy', url: 'https://www.codecademy.com/profiles/{}', category: 'Education & Learning', checkMethod: CheckMethod.BodyMatch, bodyMatch: 'Not Found', testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Udemy', url: 'https://www.udemy.com/user/{}', category: 'Education & Learning', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Photography
  { name: 'Flickr', url: 'https://www.flickr.com/people/{}', category: 'Photography', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'YouPic', url: 'https://youpic.com/photographer/{}/', category: 'Photography', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'ImageShack', url: 'https://imageshack.us/user/{}', category: 'Photography', checkMethod: CheckMethod.BodyMatch, bodyMatch: 'ImageShack - Best place for all of your image hosting and image sharing needs', testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: '500px', url: 'https://500px.com/p/{}', category: 'Photography', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'EyeEm', url: 'https://www.eyeem.com/u/{}', category: 'Photography', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'ViewBug', url: 'https://www.viewbug.com/member/{}', category: 'Photography', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'SmugMug', url: 'https://{}.smugmug.com', category: 'Photography', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Additional Social Media
  { name: 'TikTok', url: 'https://www.tiktok.com/@{}', category: 'Social Media', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Twitter', url: 'https://x.com/{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Facebook', url: 'https://www.facebook.com/{}', category: 'Social Media', checkMethod: CheckMethod.NickInTitle, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'YouTube', url: 'https://www.youtube.com/@{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Ello', url: 'https://ello.co/{}', category: 'Social Media', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Flipboard', url: 'https://flipboard.com/@{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Taringa', url: 'https://www.taringa.net/{}', category: 'Social Media', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Gab', url: 'https://gab.com/{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Parler', url: 'https://parler.com/user/{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testAvailableNick: 'alex3232e2e2e' },
  { name: 'Coub', url: 'https://coub.com/{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'admin', testAvailableNick: 'alex3232e2e2e' },

  // Additional Developer
  { name: 'Glitch', url: 'https://glitch.com/@{}', category: 'Developer', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Codeberg', url: 'https://codeberg.org/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Observable', url: 'https://observablehq.com/@{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Additional Community
  { name: 'Hive', url: 'https://hive.blog/@{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Foursquare', url: 'https://foursquare.com/user/{}', category: 'Community', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.NotUsernameBased, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Additional Content & Blogging
  { name: 'Ghost', url: 'https://{}.ghost.io', category: 'Content & Blogging', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Telegraph', url: 'https://telegra.ph/{}', category: 'Content & Blogging', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.NotUsernameBased, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Additional Gaming
  { name: 'Faceit', url: 'https://www.faceit.com/en/players/{}', category: 'Gaming', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.BotProtected, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Lichess', url: 'https://lichess.org/@/{}', category: 'Gaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Crunchyroll', url: 'https://www.crunchyroll.com/user/{}', category: 'Gaming', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Additional Music & Audio
  { name: 'Mixcloud', url: 'https://www.mixcloud.com/{}/', category: 'Music & Audio', checkMethod: CheckMethod.BodyMatch, bodyMatch: 'Page Not Found', testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Additional Video & Streaming
  { name: 'BitChute', url: 'https://www.bitchute.com/channel/{}/', category: 'Video & Streaming', checkMethod: CheckMethod.NickInTitle, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Additional Professional
  { name: 'Calendly', url: 'https://calendly.com/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Contently', url: 'https://contently.com/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Codementor', url: 'https://www.codementor.io/@{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Marketplace & E-commerce
  { name: 'eBay', url: 'https://www.ebay.com/usr/{}', category: 'Professional', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Security & Identity
  { name: 'Keybase', url: 'https://keybase.io/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Finance
  { name: 'Venmo', url: 'https://venmo.com/{}', category: 'Finance & Crypto', checkMethod: CheckMethod.Standard, testTakenNick: 'venmo', testAvailableNick: 'alex3232e2e2e' },

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
  { name: 'Codeforces', url: 'https://codeforces.com/profile/{}', category: 'Developer', checkMethod: CheckMethod.NickInTitle, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'CodeChef', url: 'https://www.codechef.com/users/{}', category: 'Developer', checkMethod: CheckMethod.BodyMatch, bodyMatch: 'CodeChef - Learn and Practice Coding with Problems', testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'AtCoder', url: 'https://atcoder.jp/users/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'tourist', testAvailableNick: 'alex3232e2e2e' },
  { name: 'TryHackMe', url: 'https://tryhackme.com/p/{}', category: 'Developer', checkMethod: CheckMethod.BodyMatch, bodyMatch: 'TryHackMe | Cyber Security Training', testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'HackTheBox', url: 'https://forum.hackthebox.com/u/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/user/{}', category: 'Developer', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Crowdin', url: 'https://crowdin.com/profile/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Social Media (additional batch)
  { name: 'Clubhouse', url: 'https://www.clubhouse.com/@{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  // Gaming (additional batch)
  { name: 'osu!', url: 'https://osu.ppy.sh/users/{}', category: 'Gaming', checkMethod: CheckMethod.Standard, testTakenNick: 'peppy', testAvailableNick: 'alex3232e2e2e' },
  { name: 'BoardGameGeek', url: 'https://boardgamegeek.com/user/{}', category: 'Gaming', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'PSN Profiles', url: 'https://psnprofiles.com/{}', category: 'Gaming', checkMethod: CheckMethod.BodyMatch, bodyMatch: 'PSNProfiles • PSN Trophy Tracking, Stats, Guides &amp; Leaderboards', testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'AniList', url: 'https://anilist.co/user/{}/', category: 'Gaming', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'TETR.IO', url: 'https://ch.tetr.io/u/{}', apiUrl: 'https://ch.tetr.io/api/users/{}', category: 'Gaming', checkMethod: CheckMethod.Standard, testTakenNick: 'osk', testAvailableNick: 'zqvx8841mkw' },

  // Music & Audio (additional batch)
  { name: 'Discogs', url: 'https://www.discogs.com/user/{}', category: 'Music & Audio', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'MuseScore', url: 'https://musescore.com/user/{}', category: 'Music & Audio', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.NotUsernameBased, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Professional (additional batch)
  { name: 'Ko-fi', url: 'https://ko-fi.com/{}', category: 'Professional', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Cameo', url: 'https://www.cameo.com/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'snoopdogg', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Beacons', url: 'https://beacons.ai/{}', category: 'Link in Bio', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.BotProtected, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Carrd', url: 'https://{}.carrd.co', category: 'Link in Bio', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Bio.link', url: 'https://bio.link/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Bento', url: 'https://bento.me/{}', category: 'Professional', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Marketplace
  { name: 'Depop', url: 'https://www.depop.com/{}/', category: 'Marketplace', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Content & Blogging (additional batch)
  { name: 'Archive.org', url: 'https://archive.org/details/@{}', category: 'Content & Blogging', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Education & Learning (additional batch)
  { name: 'freeCodeCamp', url: 'https://www.freecodecamp.org/{}', category: 'Education & Learning', checkMethod: CheckMethod.Standard, testTakenNick: 'support', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Memrise', url: 'https://www.memrise.com/user/{}/', category: 'Education & Learning', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Video & Streaming (additional batch)
  { name: 'Trovo', url: 'https://trovo.live/s/{}', category: 'Video & Streaming', checkMethod: CheckMethod.Standard, testTakenNick: 'trovo', testAvailableNick: 'alex3232e2e2e' },

  // Fitness & Sports
  { name: 'Strava', url: 'https://www.strava.com/athletes/{}', category: 'Fitness & Sports', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Additional Social Media
  { name: 'Mastodon.online', url: 'https://mastodon.online/@{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'official', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Pixelfed', url: 'https://pixelfed.social/{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'admin', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Misskey.io', url: 'https://misskey.io/@{}', category: 'Social Media', checkMethod: CheckMethod.NickInTitle, testTakenNick: 'admin', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Gettr', url: 'https://gettr.com/user/{}', category: 'Social Media', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'admin', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Plurk', url: 'https://www.plurk.com/{}', category: 'Social Media', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Hubzilla', url: 'https://hubzilla.org/channel/{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'admin', testAvailableNick: 'alex3232e2e2e' },

  // Additional Developer
  { name: 'npm Package', url: 'https://www.npmjs.com/package/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'react', testAvailableNick: 'alex3232e2e2e' },
  { name: 'CodeSandbox', url: 'https://codesandbox.io/u/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'StackBlitz', url: 'https://stackblitz.com/@{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Launchpad', url: 'https://launchpad.net/~{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'OpenHub', url: 'https://openhub.net/accounts/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Repl.it', url: 'https://repl.it/@{}', category: 'Developer', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Libraries.io', url: 'https://libraries.io/github/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'CoCalc', url: 'https://cocalc.com/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'admin', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Hex.pm', url: 'https://hex.pm/users/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Sourcehut', url: 'https://sr.ht/~{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'sircmpwn', testAvailableNick: 'alex3232e2e2e' },
  { name: 'NotABug', url: 'https://notabug.org/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testAvailableNick: 'alex3232e2e2e' },
  { name: 'Bugcrowd', url: 'https://bugcrowd.com/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Additional Gaming
  { name: 'GOG.com', url: 'https://www.gog.com/u/{}', category: 'Gaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Tabletopia', url: 'https://tabletopia.com/users/{}', category: 'Gaming', checkMethod: CheckMethod.Standard, testAvailableNick: 'alex3232e2e2e' },
  { name: 'Grouvee', url: 'https://www.grouvee.com/user/{}/', category: 'Gaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Backloggd', url: 'https://www.backloggd.com/u/{}/', category: 'Gaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'RAWG', url: 'https://rawg.io/@{}', category: 'Gaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Nexus Mods', url: 'https://www.nexusmods.com/users/{}', category: 'Gaming', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Modrinth', url: 'https://modrinth.com/user/{}', category: 'Gaming', checkMethod: CheckMethod.BodyMatch, bodyMatch: 'User not found', testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'CurseForge', url: 'https://www.curseforge.com/members/{}', category: 'Gaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'GameBanana', url: 'https://gamebanana.com/members/{}', category: 'Gaming', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.BotProtected, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Marketplace
  { name: 'Shopify', url: 'https://{}.myshopify.com', category: 'Marketplace', checkMethod: CheckMethod.Standard, testTakenNick: 'apple', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Poshmark', url: 'https://poshmark.com/closet/{}', category: 'Marketplace', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Envato', url: 'https://codecanyon.net/user/{}', category: 'Marketplace', checkMethod: CheckMethod.Standard, testTakenNick: 'developer', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Society6', url: 'https://society6.com/{}', category: 'Marketplace', checkMethod: CheckMethod.Standard, testTakenNick: 'society6', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Zazzle', url: 'https://www.zazzle.com/store/{}', category: 'Marketplace', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.BotProtected, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Teespring', url: 'https://www.teespring.com/stores/{}', category: 'Marketplace', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Storenvy', url: 'https://{}.storenvy.com', category: 'Marketplace', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'BigCartel', url: 'https://{}.bigcartel.com', category: 'Marketplace', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Food & Lifestyle
  { name: 'Untappd', url: 'https://untappd.com/user/{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Vivino', url: 'https://www.vivino.com/users/{}', category: 'Community', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Additional Professional
  { name: 'Wellfound', url: 'https://wellfound.com/u/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Contra', url: 'https://contra.com/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Lnk.Bio', url: 'https://lnk.bio/{}', category: 'Professional', checkMethod: CheckMethod.BodyMatch, bodyMatch: 'Not Found', testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Taplink', url: 'https://taplink.cc/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Notion', url: 'https://{}.notion.site', category: 'Professional', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Peerlist', url: 'https://peerlist.io/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'david', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Daily.dev', url: 'https://app.daily.dev/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Additional Music & Audio
  { name: 'Setlist.fm', url: 'https://www.setlist.fm/user/{}', category: 'Music & Audio', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Deezer', url: 'https://www.deezer.com/profile/{}', category: 'Music & Audio', checkMethod: CheckMethod.Standard, testTakenNick: 'me', testAvailableNick: 'alex3232e2e2e' },

  // Additional Community
  { name: 'Wikimedia', url: 'https://meta.wikimedia.org/wiki/User:{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'Alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Trello', url: 'https://trello.com/{}', apiUrl: 'https://api.trello.com/1/members/{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'taco', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Goodreads Author', url: 'https://www.goodreads.com/author/show/{}', category: 'Content & Blogging', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.NotUsernameBased, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'LibraryThing', url: 'https://www.librarything.com/profile/{}', category: 'Community', checkMethod: CheckMethod.BodyMatch, bodyMatch: 'doesn\'t exist', testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Mastodon.world', url: 'https://mastodon.world/@{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'official', testAvailableNick: 'alex3232e2e2e' },

  // AI & ML
  { name: 'Replicate', url: 'https://replicate.com/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'stability-ai', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Weights & Biases', url: 'https://wandb.ai/{}', category: 'Developer', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'wandb', testAvailableNick: 'alex3232e2e2e' },
  { name: 'CivitAI', url: 'https://civitai.com/user/{}', category: 'Developer', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Additional Creative & Design
  { name: 'Threadless', url: 'https://www.threadless.com/@{}', category: 'Creative & Design', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Pixiv', url: 'https://www.pixiv.net/users/{}', category: 'Creative & Design', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.NotUsernameBased, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Artfol', url: 'https://artfol.co/{}', category: 'Creative & Design', checkMethod: CheckMethod.BodyMatch, bodyMatch: 'User not found', testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Cara', url: 'https://cara.app/{}', category: 'Creative & Design', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Drawcrowd', url: 'https://drawcrowd.com/{}', category: 'Creative & Design', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Additional Content & Blogging
  { name: 'Write.as', url: 'https://write.as/{}', category: 'Content & Blogging', checkMethod: CheckMethod.Standard, testTakenNick: 'matt', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Bear Blog', url: 'https://{}.bearblog.dev', category: 'Content & Blogging', checkMethod: CheckMethod.Standard, testTakenNick: 'herman', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Micro.blog', url: 'https://micro.blog/{}', category: 'Content & Blogging', checkMethod: CheckMethod.Standard, testTakenNick: 'manton', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Neocities', url: 'https://neocities.org/site/{}', category: 'Content & Blogging', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Tumblelog', url: 'https://www.tumblelog.com/{}', category: 'Content & Blogging', checkMethod: CheckMethod.Standard, testTakenNick: 'admin', testAvailableNick: 'alex3232e2e2e' },

  // Podcasting
  { name: 'Podbean', url: 'https://{}.podbean.com', category: 'Music & Audio', checkMethod: CheckMethod.BodyMatch, bodyMatch: 'Login to your Podbean Account | Podbean', testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Anchor', url: 'https://anchor.fm/{}', category: 'Music & Audio', checkMethod: CheckMethod.BodyMatch, bodyMatch: 'Spotify for Creators - The easiest way to make a podcast', testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Podomatic', url: 'https://www.podomatic.com/podcasts/{}', category: 'Music & Audio', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Additional Finance & Crypto
  { name: 'Coinbase', url: 'https://www.coinbase.com/{}', category: 'Finance & Crypto', checkMethod: CheckMethod.Standard, testTakenNick: 'help', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Rarible', url: 'https://rarible.com/{}', category: 'Finance & Crypto', checkMethod: CheckMethod.BodyMatch, bodyMatch: 'Page Not Found', testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Foundation', url: 'https://foundation.app/@{}', category: 'Finance & Crypto', checkMethod: CheckMethod.Standard, testAvailableNick: 'alex3232e2e2e' },
  { name: 'Mirror', url: 'https://mirror.xyz/{}', category: 'Finance & Crypto', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Zora', url: 'https://zora.co/{}', category: 'Finance & Crypto', checkMethod: CheckMethod.Standard, testTakenNick: 'zora', testAvailableNick: 'alex3232e2e2e' },

  // Additional Education & Learning
  { name: 'Skillshare', url: 'https://www.skillshare.com/profile/{}', category: 'Education & Learning', checkMethod: CheckMethod.Standard, testAvailableNick: 'alex3232e2e2e' },
  { name: 'Brilliant', url: 'https://brilliant.org/profile/{}/', category: 'Education & Learning', checkMethod: CheckMethod.Standard, testAvailableNick: 'alex3232e2e2e' },
  { name: 'Brainly', url: 'https://brainly.com/profile/{}', category: 'Education & Learning', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Quizlet', url: 'https://quizlet.com/{}', category: 'Education & Learning', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Additional Photography
  { name: 'Photobucket', url: 'https://photobucket.com/u/{}', category: 'Photography', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Glass', url: 'https://glass.photo/{}', category: 'Photography', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Vero', url: 'https://vero.co/{}', category: 'Photography', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Additional Fitness & Sports
  { name: 'Komoot', url: 'https://www.komoot.com/user/{}', category: 'Fitness & Sports', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'TrainingPeaks', url: 'https://www.trainingpeaks.com/athlete/{}', category: 'Fitness & Sports', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Peloton', url: 'https://members.onepeloton.com/members/{}', category: 'Fitness & Sports', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Additional Video & Streaming
  { name: 'PeerTube', url: 'https://peertube.tv/accounts/{}', category: 'Video & Streaming', checkMethod: CheckMethod.Standard, testTakenNick: 'peertube', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Nebula', url: 'https://nebula.tv/{}', category: 'Video & Streaming', checkMethod: CheckMethod.Standard, testTakenNick: 'nebula', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Loom', url: 'https://www.loom.com/share/{}', category: 'Video & Streaming', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.NotUsernameBased, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Additional Messaging
  { name: 'Discord', url: 'https://discord.com/invite/{}', category: 'Messaging', checkMethod: CheckMethod.NickInTitle, testTakenNick: 'discord', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Matrix', url: 'https://matrix.to/#/@{}:matrix.org', apiUrl: 'https://matrix.org/_matrix/client/v3/profile/@{}:matrix.org', category: 'Messaging', checkMethod: CheckMethod.Standard, testTakenNick: 'matthew', testAvailableNick: 'zqvx8841mkw' },
  { name: 'TamTam', url: 'https://tamtam.chat/{}', category: 'Messaging', checkMethod: CheckMethod.RedirectMatch, redirectMatch: 'https://tamtam.chat/', testTakenNick: 'blue', testAvailableNick: 'zqvx8841mkw' },
  { name: 'ICQ Chat', url: 'https://icq.icqchat.co/members/{}/', category: 'Messaging', checkMethod: CheckMethod.Standard, testTakenNick: 'brookenora.54', testAvailableNick: 'zqvx8841mkw' },

  // Writing & Reading
  { name: 'Royal Road', url: 'https://www.royalroad.com/profile/{}', category: 'Content & Blogging', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.NotUsernameBased, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Additional Community
  { name: 'Tildes', url: 'https://tildes.net/user/{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Cohost', url: 'https://cohost.org/{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'staff', testAvailableNick: 'alex3232e2e2e' },

  // Hosting & Platforms
  { name: 'Vercel', url: 'https://vercel.com/{}', category: 'Developer', checkMethod: CheckMethod.NickInTitle, testTakenNick: 'vercel', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Render', url: 'https://{}.onrender.com', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'john', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Heroku', url: 'https://{}.herokuapp.com', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'api', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Netlify', url: 'https://{}.netlify.app', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'app', testAvailableNick: 'alex3232e2e2e' },
  { name: 'GitHub Pages', url: 'https://{}.github.io', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Railway', url: 'https://{}.up.railway.app', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'support', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Surge', url: 'https://{}.surge.sh', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Webflow', url: 'https://{}.webflow.io', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'official', testAvailableNick: 'alex3232e2e2e' },

  // More Social Media
  { name: 'Diaspora', url: 'https://diaspora.social/people/{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testAvailableNick: 'alex3232e2e2e' },
  { name: 'Friendica', url: 'https://friendica.world/profile/{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'john', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Funkwhale', url: 'https://open.audio/@{}', category: 'Music & Audio', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'admin', testAvailableNick: 'alex3232e2e2e' },

  // More Developer
  { name: 'Postman', url: 'https://www.postman.com/{}', category: 'Developer', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Bower', url: 'https://bower.io/search/?q={}', category: 'Developer', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'jquery', testAvailableNick: 'alex3232e2e2e' },
  { name: 'CPAN', url: 'https://metacpan.org/author/{}', apiUrl: 'https://fastapi.metacpan.org/v1/author/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'LBROCARD', testAvailableNick: 'zqvx8841mkw' },
  { name: 'OpenStreetMap', url: 'https://www.openstreetmap.org/user/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Conan.io', url: 'https://conan.io/center/recipes/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'boost', testAvailableNick: 'alex3232e2e2e' },
  { name: 'F-Droid', url: 'https://f-droid.org/packages/{}/', category: 'Developer', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.NotUsernameBased, testTakenNick: 'org.mozilla.firefox', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Homebrew', url: 'https://formulae.brew.sh/formula/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'git', testAvailableNick: 'alex3232e2e2e' },

  // More Gaming
  { name: 'GGn Profile', url: 'https://gazellegames.net/user.php?action=profile&name={}', category: 'Gaming', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Roblox Group', url: 'https://www.roblox.com/groups/{}', category: 'Gaming', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.NotUsernameBased, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Lolchess', url: 'https://lolchess.gg/profile/na/{}', category: 'Gaming', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Playstv', url: 'https://plays.tv/u/{}', category: 'Gaming', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // More Marketplace
  { name: 'Gumroad Store', url: 'https://{}.gumroad.com', category: 'Marketplace', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Sellfy', url: 'https://sellfy.com/{}', category: 'Marketplace', checkMethod: CheckMethod.Standard, testTakenNick: 'support', testAvailableNick: 'alex3232e2e2e' },
  { name: 'LemonSqueezy', url: 'https://{}.lemonsqueezy.com', category: 'Marketplace', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // More Community
  { name: 'Meetup', url: 'https://www.meetup.com/members/{}', category: 'Community', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Reddit Sub', url: 'https://www.reddit.com/r/{}', category: 'Community', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.BotProtected, testTakenNick: 'programming', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Saidit', url: 'https://saidit.net/user/{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'admin', testAvailableNick: 'alex3232e2e2e' },

  // More Professional
  { name: 'Topmate', url: 'https://topmate.io/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Superpeer', url: 'https://superpeer.com/{}', category: 'Professional', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Cal.com', url: 'https://cal.com/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Savee', url: 'https://savee.it/{}/', category: 'Professional', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Wix', url: 'https://{}.wixsite.com', category: 'Professional', checkMethod: CheckMethod.Standard, testAvailableNick: 'alex3232e2e2e' },
  { name: 'Squarespace', url: 'https://{}.squarespace.com', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // More Content & Blogging
  { name: 'Penzu', url: 'https://penzu.com/public/{}', category: 'Content & Blogging', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Svbtle', url: 'https://{}.svbtle.com', category: 'Content & Blogging', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Typeshare', url: 'https://typeshare.co/{}', category: 'Content & Blogging', checkMethod: CheckMethod.BodyMatch, bodyMatch: 'does not exist', testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // More Video & Streaming
  { name: 'YouNow', url: 'https://www.younow.com/{}', category: 'Video & Streaming', checkMethod: CheckMethod.NickInOgTitle, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // More Finance & Crypto
  { name: 'LooksRare', url: 'https://looksrare.org/accounts/{}', category: 'Finance & Crypto', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Blur', url: 'https://blur.io/{}', category: 'Finance & Crypto', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'eToro', url: 'https://www.etoro.com/api/logininfo/v1.1/users/{}', category: 'Finance & Crypto', checkMethod: CheckMethod.Standard, testTakenNick: 'jeepsontrading', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Revolut', url: 'https://revolut.me/api/web-profile/{}', category: 'Finance & Crypto', checkMethod: CheckMethod.Standard, testTakenNick: 'theaswdc', testAvailableNick: 'zqvx8841mkw' },
  { name: 'ADVFN', url: 'https://uk.advfn.com/forum/profile/{}', category: 'Finance & Crypto', checkMethod: CheckMethod.Standard, testTakenNick: 'crypto', testAvailableNick: 'zqvx8841mkw' },
  { name: 'BabyPips', url: 'https://forums.babypips.com/u/{}.json', category: 'Finance & Crypto', checkMethod: CheckMethod.Standard, testTakenNick: 'baemax023', testAvailableNick: 'zqvx8841mkw' },
  { name: 'PayPal Business', url: 'https://www.paypal.com/biz/profile-data/{}', category: 'Finance & Crypto', checkMethod: CheckMethod.Standard, testTakenNick: 'chaminajjan', testAvailableNick: 'zqvx8841mkw' },

  // More Creative & Design
  { name: 'Awwwards', url: 'https://www.awwwards.com/{}/', category: 'Creative & Design', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Layers', url: 'https://layers.to/{}', category: 'Creative & Design', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // More Education & Learning
  { name: 'Pluralsight', url: 'https://app.pluralsight.com/profile/{}', category: 'Education & Learning', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Treehouse', url: 'https://teamtreehouse.com/{}', category: 'Education & Learning', checkMethod: CheckMethod.BodyMatch, bodyMatch: 'Learn to Code Online with Treehouse | Guided Courses &amp; Techdegree Bootcamps', testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'DataCamp', url: 'https://www.datacamp.com/profile/{}', category: 'Education & Learning', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Edx', url: 'https://profile.edx.org/{}', category: 'Education & Learning', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'iNaturalist', url: 'https://api.inaturalist.org/v1/users/{}', category: 'Education & Learning', checkMethod: CheckMethod.Standard, testTakenNick: 'greg', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Bunpro', url: 'https://community.bunpro.jp/u/{}.json', category: 'Education & Learning', checkMethod: CheckMethod.Standard, testTakenNick: 'blacktide', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Booknode', url: 'https://booknode.com/profil/{}', category: 'Education & Learning', checkMethod: CheckMethod.Standard, testTakenNick: 'Paraffine', testAvailableNick: 'zqvx8841mkw' },
  { name: 'BookCrossing', url: 'https://www.bookcrossing.com/mybookshelf/{}', category: 'Education & Learning', checkMethod: CheckMethod.Standard, testTakenNick: 'countofmonte', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Alura', url: 'https://cursos.alura.com.br/user/{}', category: 'Education & Learning', checkMethod: CheckMethod.Standard, testTakenNick: 'edmilson', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Easyen', url: 'https://easyen.ru/index/8-0-{}', category: 'Education & Learning', checkMethod: CheckMethod.PresenceMatch, presenceMatch: 'День рождения', testTakenNick: 'wd', testAvailableNick: 'zqvx8841mkw' },

  // More Photography
  { name: 'GuruShots', url: 'https://gurushots.com/{}', category: 'Photography', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: '35photo', url: 'https://35photo.pro/@{}/', category: 'Photography', checkMethod: CheckMethod.RedirectMatch, redirectMatch: 'https://35photo.pro/', testTakenNick: 'mike007', testAvailableNick: 'zqvx8841mkw' },

  // Link-in-bio / Creator Pages
  { name: 'Snipfeed', url: 'https://snipfeed.co/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Flowpage', url: 'https://www.flowpage.com/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Campsite.bio', url: 'https://campsite.bio/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Stan Store', url: 'https://stan.store/{}', category: 'Professional', checkMethod: CheckMethod.BodyMatch, bodyMatch: '<title>Stan - Your Creator Store</title>', testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Xing', url: 'https://www.xing.com/profile/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'Andy_Hausmann', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Indie Hackers', url: 'https://www.indiehackers.com/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Casting Call Club', url: 'https://www.castingcall.club/{}', category: 'Professional', checkMethod: CheckMethod.RedirectMatch, redirectMatch: '/404', testTakenNick: 'Lindz', testAvailableNick: 'zqvx8841mkw' },
  { name: 'MyBuilder', url: 'https://www.mybuilder.com/profile/view/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'blue', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Habr Career', url: 'https://career.habr.com/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'sergey-kobets3', testAvailableNick: 'zqvx8841mkw' },
  { name: 'FL.ru', url: 'https://www.fl.ru/users/{}/portfolio/', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'makediffdev', testAvailableNick: 'zqvx8841mkw' },
  { name: 'SEOClerks', url: 'https://www.seoclerks.com/user/{}', category: 'Professional', checkMethod: CheckMethod.RedirectMatch, redirectMatch: 'https://www.seoclerks.com/', testTakenNick: 'Vfmseo', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Poll Everywhere', url: 'https://pollev.com/proxy/api/users/{}', category: 'Professional', checkMethod: CheckMethod.Standard, testTakenNick: 'josh', testAvailableNick: 'zqvx8841mkw' },

  // Social Media (Fediverse & Other)
  { name: 'Fosstodon', url: 'https://fosstodon.org/@{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Hachyderm', url: 'https://hachyderm.io/@{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Steemit', url: 'https://steemit.com/@{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Tenor', url: 'https://tenor.com/users/{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'X', url: 'https://api.x.com/i/users/username_available.json?username={}', category: 'Social Media', checkMethod: CheckMethod.PresenceMatch, presenceMatch: '"reason":"taken"', testTakenNick: 'WebBreacher', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Mix', url: 'https://mix.com/{}/', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'test', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Toyhouse', url: 'https://toyhou.se/{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: '22RII', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Refsheet', url: 'https://refsheet.net/{}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'razzyaurealis', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Scored', url: 'https://scored.co/api/v2/user/about.json?user={}', category: 'Social Media', checkMethod: CheckMethod.PresenceMatch, presenceMatch: '"status":true', testTakenNick: 'LowEnergyFaggot', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Pr0gramm', url: 'https://pr0gramm.com/api/profile/info?name={}', category: 'Social Media', checkMethod: CheckMethod.Standard, testTakenNick: 'kaizernero', testAvailableNick: 'zqvx8841mkw' },

  // Developer (Additional)
  { name: 'HackerEarth', url: 'https://www.hackerearth.com/@{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Read the Docs', url: 'https://readthedocs.org/profiles/{}/', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Asciinema', url: 'https://asciinema.org/~{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Laracasts', url: 'https://laracasts.com/@{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'CodersRank', url: 'https://profile.codersrank.io/user/{}', category: 'Developer', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Zotero', url: 'https://www.zotero.org/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Hackaday.io', url: 'https://hackaday.io/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Chocolatey', url: 'https://community.chocolatey.org/profiles/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'daronmcintosh', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Greasy Fork', url: 'https://greasyfork.org/en/users?q={}', category: 'Developer', checkMethod: CheckMethod.PresenceMatch, presenceMatch: 'class="user-list"', testTakenNick: 'TScofield', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Monkeytype', url: 'https://api.monkeytype.com/users/{}/profile', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'rocket', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Microsoft Learn', url: 'https://learn.microsoft.com/api/profiles/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'nityan', testAvailableNick: 'zqvx8841mkw' },
  { name: 'W3Schools', url: 'https://pathfinder-api.kai.w3spaces.com/public-profile-api/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'test', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Arduino Project Hub', url: 'https://projecthub.arduino.cc/{}', category: 'Developer', checkMethod: CheckMethod.PresenceMatch, presenceMatch: '"userInfo":{', testTakenNick: 'peter', testAvailableNick: 'zqvx8841mkw' },
  { name: 'WordPress.org', url: 'https://login.wordpress.org/wp-json/wporg/v1/username-available/{}', category: 'Developer', checkMethod: CheckMethod.PresenceMatch, presenceMatch: '"error":"That username is already in use.', testTakenNick: 'toszcze', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Cloudflare Community', url: 'https://community.cloudflare.com/u/{}/card.json', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'carl', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Coda', url: 'https://coda.io/@{}/', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'huizer', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Elastic Discuss', url: 'https://discuss.elastic.co/u/{}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'whoami', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Commudle', url: 'https://json.commudle.com/api/v2/users?username={}', category: 'Developer', checkMethod: CheckMethod.Standard, testTakenNick: 'akaashtripathi', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Statuspage', url: 'https://{}.statuspage.io/api/v2/status.json', category: 'Developer', checkMethod: CheckMethod.RedirectMatch, redirectMatch: '/software/statuspage', testTakenNick: '8713981tpdlg', testAvailableNick: 'zqvx8841mkw' },

  // Content & Blogging (Additional)
  { name: 'Tapas', url: 'https://tapas.io/{}', category: 'Content & Blogging', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Open Library', url: 'https://openlibrary.org/people/{}', category: 'Content & Blogging', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Creative & Design (Additional)
  { name: 'Thingiverse', url: 'https://www.thingiverse.com/{}', category: 'Creative & Design', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.ClientRendered, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Cults3D', url: 'https://www.cults3d.com/en/users/{}/3d-models', category: 'Creative & Design', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'GrabCAD', url: 'https://grabcad.com/{}', category: 'Creative & Design', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Weasyl', url: 'https://www.weasyl.com/~{}', category: 'Creative & Design', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Domestika', url: 'https://www.domestika.org/en/{}', category: 'Creative & Design', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Saatchi Art', url: 'https://www.saatchiart.com/{}', category: 'Creative & Design', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Artbreeder', url: 'https://www.artbreeder.com/{}', category: 'Creative & Design', checkMethod: CheckMethod.Standard, testTakenNick: 'dolores', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Picsart', url: 'https://api.picsart.com/users/show/{}.json', category: 'Creative & Design', checkMethod: CheckMethod.PresenceMatch, presenceMatch: '"status":"success"', testTakenNick: 'john', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Fine Art America', url: 'https://fineartamerica.com/profiles/{}', category: 'Creative & Design', checkMethod: CheckMethod.RedirectMatch, redirectMatch: '/artistdirectory', testTakenNick: 'scott-norris', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Home Design 3D', url: 'https://www.homedesign3d.net/user/{}', category: 'Creative & Design', checkMethod: CheckMethod.RedirectMatch, redirectMatch: '/community', testTakenNick: 'carlos01', testAvailableNick: 'zqvx8841mkw' },

  // Music & Audio (Additional)
  { name: 'Traktrain', url: 'https://traktrain.com/{}', category: 'Music & Audio', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Freesound', url: 'https://freesound.org/people/{}/', category: 'Music & Audio', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'BandLab', url: 'https://www.bandlab.com/api/v1.3/users/{}', category: 'Music & Audio', checkMethod: CheckMethod.Standard, testTakenNick: 'rave_flawless', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Mixlr', url: 'https://api.mixlr.com/users/{}', category: 'Music & Audio', checkMethod: CheckMethod.Standard, testTakenNick: 'test', testAvailableNick: 'zqvx8841mkw' },
  { name: 'stats.fm', url: 'https://api.stats.fm/api/v1/users/{}', category: 'Music & Audio', checkMethod: CheckMethod.Standard, testTakenNick: 'korel', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Ultimate Guitar', url: 'https://www.ultimate-guitar.com/u/{}', category: 'Music & Audio', checkMethod: CheckMethod.NotFoundBodyMatch, bodyMatch: 'Oops! We couldn\'t find that page.', testTakenNick: 'LYNX-Music', testAvailableNick: 'zqvx8841mkw' },
  { name: 'gpodder.net', url: 'https://gpodder.net/user/{}/', category: 'Music & Audio', checkMethod: CheckMethod.Standard, testTakenNick: 'blue', testAvailableNick: 'zqvx8841mkw' },
  { name: 'HulkShare', url: 'https://www.hulkshare.com/{}', category: 'Music & Audio', checkMethod: CheckMethod.PresenceMatch, presenceMatch: 'id="profile_image"', testTakenNick: 'djjamesryan', testAvailableNick: 'zqvx8841mkw' },

  // Video & Streaming (Additional)
  { name: 'DonationAlerts', url: 'https://www.donationalerts.com/r/{}', category: 'Video & Streaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Gaming (Additional)
  { name: 'Metacritic', url: 'https://www.metacritic.com/user/{}', category: 'Gaming', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Community (Additional)
  { name: 'Geocaching', url: 'https://www.geocaching.com/p/default.aspx?u={}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'OpenHumans', url: 'https://www.openhumans.org/member/{}/', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Wikidata', url: 'https://www.wikidata.org/wiki/User:{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },

  // Marketplace (Additional)
  { name: 'Creator Spring', url: 'https://{}.creator-spring.com', category: 'Marketplace', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'eBay Stores', url: 'https://www.ebay.com/str/{}', category: 'Marketplace', checkMethod: CheckMethod.NotFoundBodyMatch, bodyMatch: 'Sorry, this store was not found.', testTakenNick: 'tactical', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Wishlistr', url: 'https://www.wishlistr.com/sign-up/?rs=checkUserName&rsargs[]={}', category: 'Marketplace', checkMethod: CheckMethod.PresenceMatch, presenceMatch: '+:var res = "', testTakenNick: 'bodymodgrrrl', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Zillow', url: 'https://www.zillow.com/profile/{}/', category: 'Marketplace', checkMethod: CheckMethod.RedirectMatch, redirectMatch: '/professionals/real-estate-agent-reviews/', testTakenNick: 'JOHN-L-SULLIVAN', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Zomato', url: 'https://www.zomato.com/{}/reviews', category: 'Marketplace', checkMethod: CheckMethod.Standard, testTakenNick: 'john', testAvailableNick: 'zqvx8841mkw' },
  { name: 'myWishBoard', url: 'https://mywishboard.com/@{}', category: 'Marketplace', checkMethod: CheckMethod.Standard, testTakenNick: 'ke7_2024', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Spreadshop', url: 'https://myspreadshop.de/{}/shopData/list', category: 'Marketplace', checkMethod: CheckMethod.Standard, testTakenNick: 'arukori', testAvailableNick: 'zqvx8841mkw' },

  // Fitness & Sports (Additional)
  { name: 'Smashrun', url: 'https://smashrun.com/{}', category: 'Fitness & Sports', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Garmin Connect', url: 'https://connect.garmin.com/app/profile/{}', category: 'Fitness & Sports', checkMethod: CheckMethod.PresenceMatch, presenceMatch: 'window.VIEWER_USERPREFERENCES = {', testTakenNick: 'tommy', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Sports Tracker', url: 'https://api.sports-tracker.com/apiserver/v1/user/name/{}', category: 'Fitness & Sports', checkMethod: CheckMethod.PresenceMatch, presenceMatch: '"uuid":', testTakenNick: 'petriola', testAvailableNick: 'zqvx8841mkw' },
  { name: 'MyFitnessPal', url: 'https://community.myfitnesspal.com/en/profile/{}', category: 'Fitness & Sports', checkMethod: CheckMethod.Standard, testTakenNick: 'malibu927', testAvailableNick: 'zqvx8841mkw' },
  { name: 'MapMyTracks', url: 'https://www.mapmytracks.com/{}', category: 'Fitness & Sports', checkMethod: CheckMethod.RedirectMatch, redirectMatch: '/404', testTakenNick: 'ulirad', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Pinkbike', url: 'https://www.pinkbike.com/u/{}/', category: 'Fitness & Sports', checkMethod: CheckMethod.Standard, testTakenNick: 'whistlermountainbikepark', testAvailableNick: 'zqvx8841mkw' },
  { name: 'SFD', url: 'https://www.sfd.pl/profile/{}', category: 'Fitness & Sports', checkMethod: CheckMethod.Standard, testTakenNick: 'janek', testAvailableNick: 'zqvx8841mkw' },

  // Domain Names (DNS-over-HTTPS via Cloudflare)
  { name: '.com', url: 'https://rdap.verisign.com/com/v1/domain/{}.com', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.org', url: 'https://rdap.publicinterestregistry.org/rdap/domain/{}.org', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.net', url: 'https://rdap.verisign.com/net/v1/domain/{}.net', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.io', url: 'https://rdap.identitydigital.services/rdap/domain/{}.io', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'nic', testAvailableNick: 'alex3232e2e2e' },
  { name: '.co', url: 'https://cloudflare-dns.com/dns-query?name={}.co&type=A', category: 'Domain Names', checkMethod: CheckMethod.DNS, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.dev', url: 'https://pubapi.registry.google/rdap/domain/{}.dev', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'web', testAvailableNick: 'alex3232e2e2e' },
  { name: '.app', url: 'https://pubapi.registry.google/rdap/domain/{}.app', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.me', url: 'https://rdap.identitydigital.services/rdap/domain/{}.me', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'nic', testAvailableNick: 'alex3232e2e2e' },
  { name: '.xyz', url: 'https://rdap.centralnic.com/xyz/domain/{}.xyz', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'abc', testAvailableNick: 'alex3232e2e2e' },
  { name: '.ai', url: 'https://rdap.identitydigital.services/rdap/domain/{}.ai', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.gg', url: 'https://cloudflare-dns.com/dns-query?name={}.gg&type=A', category: 'Domain Names', checkMethod: CheckMethod.DNS, testTakenNick: 'discord', testAvailableNick: 'alex3232e2e2e' },
  { name: '.tv', url: 'https://rdap.nic.tv/domain/{}.tv', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'twitch', testAvailableNick: 'alex3232e2e2e' },
  { name: '.fm', url: 'https://rdap.centralnic.com/fm/domain/{}.fm', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'last', testAvailableNick: 'alex3232e2e2e' },
  { name: '.us', url: 'https://rdap.nic.us/domain/{}.us', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'nic', testAvailableNick: 'alex3232e2e2e' },
  { name: '.cc', url: 'https://tld-rdap.verisign.com/cc/v1/domain/{}.cc', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.biz', url: 'https://rdap.nic.biz/domain/{}.biz', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.info', url: 'https://rdap.identitydigital.services/rdap/domain/{}.info', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.de', url: 'https://rdap.denic.de/domain/{}.de', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'nic', testAvailableNick: 'alex3232e2e2e' },
  { name: '.eu', url: 'https://cloudflare-dns.com/dns-query?name={}.eu&type=A', category: 'Domain Names', checkMethod: CheckMethod.DNS, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.uk', url: 'https://rdap.nominet.uk/uk/domain/{}.uk', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.ca', url: 'https://rdap.ca.fury.ca/rdap/domain/{}.ca', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.in', url: 'https://rdap.nixiregistry.in/rdap/domain/{}.in', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.mobi', url: 'https://rdap.identitydigital.services/rdap/domain/{}.mobi', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'nic', testAvailableNick: 'alex3232e2e2e' },
  { name: '.ws', url: 'https://cloudflare-dns.com/dns-query?name={}.ws&type=A', category: 'Domain Names', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.WildcardDns, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.ee', url: 'https://cloudflare-dns.com/dns-query?name={}.ee&type=A', category: 'Domain Names', checkMethod: CheckMethod.DNS, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.at', url: 'https://cloudflare-dns.com/dns-query?name={}.at&type=A', category: 'Domain Names', checkMethod: CheckMethod.DNS, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.ru', url: 'https://cloudflare-dns.com/dns-query?name={}.ru&type=A', category: 'Domain Names', checkMethod: CheckMethod.DNS, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.jp', url: 'https://cloudflare-dns.com/dns-query?name={}.jp&type=A', category: 'Domain Names', checkMethod: CheckMethod.DNS, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.cn', url: 'https://cloudflare-dns.com/dns-query?name={}.cn&type=A', category: 'Domain Names', checkMethod: CheckMethod.DNS, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.do', url: 'https://cloudflare-dns.com/dns-query?name={}.do&type=A', category: 'Domain Names', checkMethod: CheckMethod.DNS, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.tech', url: 'https://rdap.radix.host/rdap/domain/{}.tech', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.online', url: 'https://rdap.radix.host/rdap/domain/{}.online', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.site', url: 'https://rdap.radix.host/rdap/domain/{}.site', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.store', url: 'https://rdap.radix.host/rdap/domain/{}.store', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.club', url: 'https://rdap.nic.club/domain/{}.club', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'nic', testAvailableNick: 'alex3232e2e2e' },
  { name: '.fun', url: 'https://rdap.radix.host/rdap/domain/{}.fun', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.space', url: 'https://rdap.radix.host/rdap/domain/{}.space', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.pro', url: 'https://rdap.identitydigital.services/rdap/domain/{}.pro', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.life', url: 'https://rdap.identitydigital.services/rdap/domain/{}.life', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'nic', testAvailableNick: 'alex3232e2e2e' },
  { name: '.world', url: 'https://rdap.identitydigital.services/rdap/domain/{}.world', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'nic', testAvailableNick: 'alex3232e2e2e' },
  { name: '.live', url: 'https://rdap.identitydigital.services/rdap/domain/{}.live', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'nic', testAvailableNick: 'alex3232e2e2e' },
  { name: '.today', url: 'https://rdap.identitydigital.services/rdap/domain/{}.today', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'nic', testAvailableNick: 'alex3232e2e2e' },
  { name: '.design', url: 'https://rdap.nic.design/domain/{}.design', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.studio', url: 'https://rdap.identitydigital.services/rdap/domain/{}.studio', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'nic', testAvailableNick: 'alex3232e2e2e' },
  { name: '.agency', url: 'https://rdap.identitydigital.services/rdap/domain/{}.agency', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'nic', testAvailableNick: 'alex3232e2e2e' },
  { name: '.digital', url: 'https://rdap.identitydigital.services/rdap/domain/{}.digital', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'nic', testAvailableNick: 'alex3232e2e2e' },
  { name: '.network', url: 'https://rdap.identitydigital.services/rdap/domain/{}.network', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'nic', testAvailableNick: 'alex3232e2e2e' },
  { name: '.media', url: 'https://rdap.identitydigital.services/rdap/domain/{}.media', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'nic', testAvailableNick: 'alex3232e2e2e' },
  { name: '.blog', url: 'https://rdap.blog.fury.ca/rdap/domain/{}.blog', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.shop', url: 'https://rdap.gmoregistry.net/rdap/domain/{}.shop', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.cloud', url: 'https://rdap.registry.cloud/rdap/domain/{}.cloud', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.email', url: 'https://rdap.identitydigital.services/rdap/domain/{}.email', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'nic', testAvailableNick: 'alex3232e2e2e' },
  { name: '.game', url: 'https://rdap.centralnic.com/game/domain/{}.game', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.social', url: 'https://rdap.identitydigital.services/rdap/domain/{}.social', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'nic', testAvailableNick: 'alex3232e2e2e' },
  { name: '.plus', url: 'https://rdap.identitydigital.services/rdap/domain/{}.plus', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.page', url: 'https://pubapi.registry.google/rdap/domain/{}.page', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'nic', testAvailableNick: 'alex3232e2e2e' },
  { name: '.link', url: 'https://rdap.uniregistry.net/rdap/domain/{}.link', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.click', url: 'https://rdap.registry.click/rdap/domain/{}.click', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.host', url: 'https://rdap.radix.host/rdap/domain/{}.host', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.zone', url: 'https://rdap.identitydigital.services/rdap/domain/{}.zone', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'nic', testAvailableNick: 'alex3232e2e2e' },
  { name: '.ninja', url: 'https://rdap.identitydigital.services/rdap/domain/{}.ninja', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'nic', testAvailableNick: 'alex3232e2e2e' },
  { name: '.guru', url: 'https://rdap.identitydigital.services/rdap/domain/{}.guru', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'nic', testAvailableNick: 'alex3232e2e2e' },
  { name: '.expert', url: 'https://rdap.identitydigital.services/rdap/domain/{}.expert', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'nic', testAvailableNick: 'alex3232e2e2e' },
  { name: '.solutions', url: 'https://rdap.identitydigital.services/rdap/domain/{}.solutions', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'nic', testAvailableNick: 'alex3232e2e2e' },
  { name: '.systems', url: 'https://rdap.identitydigital.services/rdap/domain/{}.systems', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'nic', testAvailableNick: 'alex3232e2e2e' },
  { name: '.works', url: 'https://rdap.identitydigital.services/rdap/domain/{}.works', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'nic', testAvailableNick: 'alex3232e2e2e' },
  { name: '.academy', url: 'https://rdap.identitydigital.services/rdap/domain/{}.academy', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'nic', testAvailableNick: 'alex3232e2e2e' },
  { name: '.center', url: 'https://rdap.identitydigital.services/rdap/domain/{}.center', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'nic', testAvailableNick: 'alex3232e2e2e' },
  { name: '.company', url: 'https://rdap.identitydigital.services/rdap/domain/{}.company', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'nic', testAvailableNick: 'alex3232e2e2e' },
  { name: '.team', url: 'https://rdap.identitydigital.services/rdap/domain/{}.team', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'nic', testAvailableNick: 'alex3232e2e2e' },
  { name: '.tools', url: 'https://rdap.identitydigital.services/rdap/domain/{}.tools', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'nic', testAvailableNick: 'alex3232e2e2e' },
  { name: '.ventures', url: 'https://rdap.identitydigital.services/rdap/domain/{}.ventures', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.partners', url: 'https://rdap.identitydigital.services/rdap/domain/{}.partners', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'nic', testAvailableNick: 'alex3232e2e2e' },
  { name: '.capital', url: 'https://rdap.identitydigital.services/rdap/domain/{}.capital', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'nic', testAvailableNick: 'alex3232e2e2e' },
  { name: '.money', url: 'https://rdap.identitydigital.services/rdap/domain/{}.money', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'nic', testAvailableNick: 'alex3232e2e2e' },
  { name: '.exchange', url: 'https://rdap.identitydigital.services/rdap/domain/{}.exchange', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'nic', testAvailableNick: 'alex3232e2e2e' },
  { name: '.trading', url: 'https://rdap.identitydigital.services/rdap/domain/{}.trading', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.finance', url: 'https://rdap.identitydigital.services/rdap/domain/{}.finance', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.crypto', url: 'https://cloudflare-dns.com/dns-query?name={}.crypto&type=A', category: 'Domain Names', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.NotInDns, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.nft', url: 'https://cloudflare-dns.com/dns-query?name={}.nft&type=A', category: 'Domain Names', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.NotInDns, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.web3', url: 'https://cloudflare-dns.com/dns-query?name={}.web3&type=A', category: 'Domain Names', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.NotInDns, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.sh', url: 'https://rdap.identitydigital.services/rdap/domain/{}.sh', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'nic', testAvailableNick: 'alex3232e2e2e' },
  { name: '.so', url: 'https://cloudflare-dns.com/dns-query?name={}.so&type=A', category: 'Domain Names', checkMethod: CheckMethod.DNS, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.lol', url: 'https://rdap.centralnic.com/lol/domain/{}.lol', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.bio', url: 'https://rdap.identitydigital.services/rdap/domain/{}.bio', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.name', url: 'https://tld-rdap.verisign.com/name/v1/domain/{}.name', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.land', url: 'https://rdap.identitydigital.services/rdap/domain/{}.land', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'nic', testAvailableNick: 'alex3232e2e2e' },
  { name: '.run', url: 'https://rdap.identitydigital.services/rdap/domain/{}.run', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'nic', testAvailableNick: 'alex3232e2e2e' },
  { name: '.one', url: 'https://rdap.nic.one/domain/{}.one', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.to', url: 'https://rdap.tonicregistry.to/rdap/domain/{}.to', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.la', url: 'https://cloudflare-dns.com/dns-query?name={}.la&type=A', category: 'Domain Names', checkMethod: CheckMethod.DNS, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.id', url: 'https://rdap.pandi.id/rdap/domain/{}.id', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.ph', url: 'https://cloudflare-dns.com/dns-query?name={}.ph&type=A', category: 'Domain Names', checkMethod: CheckMethod.Unverifiable, unverifiableReason: UnverifiableReason.WildcardDns, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.br', url: 'https://rdap.registro.br/domain/{}.br', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'nic', testAvailableNick: 'alex3232e2e2e' },
  { name: '.nl', url: 'https://rdap.sidn.nl/domain/{}.nl', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.fr', url: 'https://rdap.nic.fr/domain/{}.fr', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.it', url: 'https://cloudflare-dns.com/dns-query?name={}.it&type=A', category: 'Domain Names', checkMethod: CheckMethod.DNS, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.es', url: 'https://cloudflare-dns.com/dns-query?name={}.es&type=A', category: 'Domain Names', checkMethod: CheckMethod.DNS, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.pl', url: 'https://rdap.dns.pl/domain/{}.pl', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.se', url: 'https://cloudflare-dns.com/dns-query?name={}.se&type=A', category: 'Domain Names', checkMethod: CheckMethod.DNS, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.no', url: 'https://rdap.norid.no/domain/{}.no', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.fi', url: 'https://rdap.fi/rdap/rdap/domain/{}.fi', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.dk', url: 'https://cloudflare-dns.com/dns-query?name={}.dk&type=A', category: 'Domain Names', checkMethod: CheckMethod.DNS, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.ch', url: 'https://rdap.nic.ch/domain/{}.ch', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'nic', testAvailableNick: 'alex3232e2e2e' },
  { name: '.au', url: 'https://rdap.cctld.au/rdap/domain/{}.au', category: 'Domain Names', checkMethod: CheckMethod.Rdap, testTakenNick: 'google', testAvailableNick: 'alex3232e2e2e' },
  { name: '.nz', url: 'https://cloudflare-dns.com/dns-query?name={}.nz&type=A', category: 'Domain Names', checkMethod: CheckMethod.DNS, testTakenNick: 'shop', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Kick', url: 'https://kick.com/{}', category: 'Video & Streaming', checkMethod: CheckMethod.BodyMatch, bodyMatch: 'Channel Not Found', testTakenNick: 'xqc', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Aparat', url: 'https://www.aparat.com/api/fa/v1/user/user/information/username/{}', category: 'Video & Streaming', checkMethod: CheckMethod.Standard, testTakenNick: 'unni_gilda', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Nightbot', url: 'https://api.nightbot.tv/1/channels/t/{}', category: 'Video & Streaming', checkMethod: CheckMethod.Standard, testTakenNick: 'saevid', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Pillowfort', url: 'https://www.pillowfort.social/{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'Staff', testAvailableNick: 'alex3232e2e2e' },
  { name: 'OpenStreetMap Wiki', url: 'https://wiki.openstreetmap.org/w/api.php?action=query&format=json&list=users&ususers={}', category: 'Community', checkMethod: CheckMethod.PresenceMatch, presenceMatch: '"userid":', testTakenNick: 'kemkim', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Fur Affinity', url: 'https://www.furaffinity.net/user/{}/', category: 'Community', checkMethod: CheckMethod.NotFoundBodyMatch, bodyMatch: '<h2>System Error</h2>', testTakenNick: 'karintina', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Postcrossing', url: 'https://www.postcrossing.com/user/{}', category: 'Community', checkMethod: CheckMethod.RedirectMatch, redirectMatch: '/login', testTakenNick: 'Vladimir', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Brickset', url: 'https://brickset.com/profile/{}', category: 'Community', checkMethod: CheckMethod.PresenceMatch, presenceMatch: 'Member since:</dt>', testTakenNick: 'lowlead', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Shikimori', url: 'https://shikimori.io/{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'STARHun', testAvailableNick: 'zqvx8841mkw' },
  { name: 'ScoutWiki', url: 'https://en.scoutwiki.org/User:{}', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'Mlh_nl', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Discourse', url: 'https://meta.discourse.org/u/{}/summary.json', category: 'Community', checkMethod: CheckMethod.Standard, testTakenNick: 'ndalliard', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Tabletop Tournament', url: 'https://www.tabletoptournaments.net/eu/player/{}', category: 'Community', checkMethod: CheckMethod.PresenceMatch, presenceMatch: '- Player Profile | T³ - TableTop Tournaments', testTakenNick: 'Lars01', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Buttondown', url: 'https://buttondown.com/{}', category: 'Newsletters', checkMethod: CheckMethod.Standard, testTakenNick: 'john', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Beehiiv', url: 'https://{}.beehiiv.com', category: 'Newsletters', checkMethod: CheckMethod.Standard, testTakenNick: 'daily', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Dreamwidth', url: 'https://{}.dreamwidth.org', category: 'Content & Blogging', checkMethod: CheckMethod.Standard, testTakenNick: 'news', testAvailableNick: 'alex3232e2e2e' },
  { name: 'Ameblo', url: 'https://ameblo.jp/{}', category: 'Content & Blogging', checkMethod: CheckMethod.Standard, testTakenNick: 'ereko-blog', testAvailableNick: 'zqvx8841mkw' },
  { name: 'InsaneJournal', url: 'https://{}.insanejournal.com/profile', category: 'Content & Blogging', checkMethod: CheckMethod.PresenceMatch, presenceMatch: 'User:', testTakenNick: 'test', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Steller', url: 'https://steller.co/{}', category: 'Content & Blogging', checkMethod: CheckMethod.Standard, testTakenNick: 'jeannnn', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Blogmarks', url: 'http://blogmarks.net/user/{}', category: 'Content & Blogging', checkMethod: CheckMethod.NickInTitle, testTakenNick: 'test', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Stack Overflow', url: 'https://api.stackexchange.com/2.3/users?order=desc&sort=name&inname={}&site=stackoverflow', category: 'Q&A & Knowledge', checkMethod: CheckMethod.PresenceMatch, presenceMatch: '"items":[{', testTakenNick: 'vonc', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Quora', url: 'https://www.quora.com/profile/{}', category: 'Q&A & Knowledge', checkMethod: CheckMethod.Standard, testTakenNick: 'John-Galan-5', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Zhihu', url: 'https://api.zhihu.com/books/people/{}/publications?offset=0&limit=5', category: 'Q&A & Knowledge', checkMethod: CheckMethod.Standard, testTakenNick: 'lushnis', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Habr Q&A', url: 'https://qna.habr.com/user/{}', category: 'Q&A & Knowledge', checkMethod: CheckMethod.Standard, testTakenNick: 'Masthead', testAvailableNick: 'zqvx8841mkw' },
  { name: 'MyLot', url: 'https://www.mylot.com/{}', category: 'Q&A & Knowledge', checkMethod: CheckMethod.Standard, testTakenNick: 'Tampa_girl7', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Znanija', url: 'https://znanija.com/graphql/ru?operationName=NickAvailability&query=query%20NickAvailability%28%24nick%3AString%21%29%7BnickAvailability%28nick%3A%24nick%29%7BisAvailable%7D%7D&variables=%7B%22nick%22%3A%22{}%22%7D', category: 'Q&A & Knowledge', checkMethod: CheckMethod.PresenceMatch, presenceMatch: '"isAvailable":false', testTakenNick: 'ila817674', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Kickstarter', url: 'https://www.kickstarter.com/profile/{}', category: 'Crowdfunding & Support', checkMethod: CheckMethod.Standard, testTakenNick: 'john', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Liberapay', url: 'https://liberapay.com/{}', category: 'Crowdfunding & Support', checkMethod: CheckMethod.Standard, testTakenNick: 'db0', testAvailableNick: 'zqvx8841mkw' },
  { name: 'PayPal.Me', url: 'https://www.paypal.com/paypalme/{}', category: 'Crowdfunding & Support', checkMethod: CheckMethod.PresenceMatch, presenceMatch: '"recipientSlugDetails":', testTakenNick: 'ckl94', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Boosty', url: 'https://api.boosty.to/v1/blog/{}', category: 'Crowdfunding & Support', checkMethod: CheckMethod.Standard, testTakenNick: 'evdokia', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Patronite', url: 'https://patronite.pl/{}', category: 'Crowdfunding & Support', checkMethod: CheckMethod.Standard, testTakenNick: 'radio357', testAvailableNick: 'zqvx8841mkw' },
  { name: 'TipeeeStream', url: 'https://www.tipeeestream.com/v3.0/pages/{}', category: 'Crowdfunding & Support', checkMethod: CheckMethod.Standard, testTakenNick: 'gagzzz', testAvailableNick: 'zqvx8841mkw' },
  { name: 'StreamElements', url: 'https://api.streamelements.com/kappa/v2/channels/{}', category: 'Crowdfunding & Support', checkMethod: CheckMethod.Standard, testTakenNick: 'honey', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Streamlabs', url: 'https://streamlabs.com/api/v6/user/{}', category: 'Crowdfunding & Support', checkMethod: CheckMethod.NotFoundBodyMatch, bodyMatch: '<title>Unauthorized</title>', testTakenNick: 'veibae', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Donatello', url: 'https://donatello.to/{}', category: 'Crowdfunding & Support', checkMethod: CheckMethod.Standard, testTakenNick: 'Metvix', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Cafecito', url: 'https://cafecito.app/{}', category: 'Crowdfunding & Support', checkMethod: CheckMethod.PresenceMatch, presenceMatch: ' | Cafecito</title>', testTakenNick: 'braftty', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Kit', url: 'https://{}.ck.page', category: 'Newsletters', checkMethod: CheckMethod.Standard, testTakenNick: 'alex', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Paragraph', url: 'https://paragraph.com/api/blogs/@{}', category: 'Newsletters', checkMethod: CheckMethod.Standard, testTakenNick: 'wibtal', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Prose', url: 'https://prose.astral.camp/{}/', category: 'Newsletters', checkMethod: CheckMethod.Standard, testTakenNick: 'endeavorance', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Rant.li', url: 'https://rant.li/{}/', category: 'Newsletters', checkMethod: CheckMethod.Standard, testTakenNick: 'baretri', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Bio Site', url: 'https://bio.site/{}', category: 'Link in Bio', checkMethod: CheckMethod.Standard, testTakenNick: 'leticiabufoni', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Choko.Link', url: 'https://choko.link/{}', category: 'Link in Bio', checkMethod: CheckMethod.Standard, testTakenNick: 'ForgedSteelTools', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Flowcode', url: 'https://www.flow.page/{}', category: 'Link in Bio', checkMethod: CheckMethod.Standard, testTakenNick: 'slotrhouse', testAvailableNick: 'zqvx8841mkw' },
  { name: 'HiHello', url: 'https://www.hihello.com/author/{}', category: 'Link in Bio', checkMethod: CheckMethod.Standard, testTakenNick: 'pascal-theriault', testAvailableNick: 'zqvx8841mkw' },
  { name: 'hoo.be', url: 'https://hoo.be/{}', category: 'Link in Bio', checkMethod: CheckMethod.Standard, testTakenNick: 'chrishemsworth', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Komi', url: 'https://api.komi.io/api/talent/usernames/{}', category: 'Link in Bio', checkMethod: CheckMethod.Standard, testTakenNick: 'abbysage', testAvailableNick: 'zqvx8841mkw' },
  { name: 'mssg.me', url: 'https://{}.mssg.me/', category: 'Link in Bio', checkMethod: CheckMethod.Standard, testTakenNick: 'drrry', testAvailableNick: 'zqvx8841mkw' },
  { name: 'omg.lol', url: 'https://api.omg.lol/address/{}/info', category: 'Link in Bio', checkMethod: CheckMethod.Standard, testTakenNick: 'cwa', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Popl', url: 'https://poplme.co/{}', category: 'Link in Bio', checkMethod: CheckMethod.Standard, testTakenNick: 'rpelite', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Solo.to', url: 'https://solo.to/{}', category: 'Link in Bio', checkMethod: CheckMethod.Standard, testTakenNick: 'saruei', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Tappy', url: 'https://api.tappy.tech/api/profile/username/{}', category: 'Link in Bio', checkMethod: CheckMethod.PresenceMatch, presenceMatch: 'user_id', testTakenNick: 'alexborrelli', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Visness Card', url: 'https://my.visnesscard.com/Home/GetCard/{}', category: 'Link in Bio', checkMethod: CheckMethod.PresenceMatch, presenceMatch: 'end_point', testTakenNick: 'Lisa-Gordon', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Farcaster', url: 'https://farcaster.xyz/{}', category: 'Web3 & Decentralized', checkMethod: CheckMethod.JsonApi, apiUrl: 'https://fnames.farcaster.xyz/transfers/current?name={}', jsonPath: 'transfer.username', testTakenNick: 'dwr', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Minds', url: 'https://www.minds.com/api/v3/register/validate?username={}', category: 'Web3 & Decentralized', checkMethod: CheckMethod.PresenceMatch, presenceMatch: '"valid":false', testTakenNick: 'gigan996', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Cent', url: 'https://beta.cent.co/data/user/profile?userHandles={}', category: 'Web3 & Decentralized', checkMethod: CheckMethod.PresenceMatch, presenceMatch: '"id":', testTakenNick: 'alex', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Nifty Gateway', url: 'https://api.niftygateway.com/user/profile-and-offchain-nifties-by-url/?profile_url={}', category: 'Web3 & Decentralized', checkMethod: CheckMethod.NotFoundBodyMatch, bodyMatch: '&quot;didSucceed&quot;: false', testTakenNick: 'kobej', testAvailableNick: 'zqvx8841mkw' },
  { name: 'MintMe', url: 'https://www.mintme.com/token/{}', category: 'Web3 & Decentralized', checkMethod: CheckMethod.Standard, testTakenNick: 'john', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Mastodon (any instance)', url: 'https://mastodon.social/api/v2/search?q={}&limit=1&type=accounts', category: 'Web3 & Decentralized', checkMethod: CheckMethod.PresenceMatch, presenceMatch: 'display_name', testTakenNick: 'Richard_Littler', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Naver', url: 'https://blog.naver.com/{}', category: 'East Asia', checkMethod: CheckMethod.Standard, testTakenNick: 'bob', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Note', url: 'https://note.com/api/v2/creators/{}', category: 'East Asia', checkMethod: CheckMethod.Standard, testTakenNick: 'honey', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Zenn', url: 'https://zenn.dev/{}', category: 'East Asia', checkMethod: CheckMethod.Standard, testTakenNick: 'john', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Qiita', url: 'https://qiita.com/{}', category: 'East Asia', checkMethod: CheckMethod.Standard, testTakenNick: 'Qiita', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Suzuri', url: 'https://suzuri.jp/{}', category: 'East Asia', checkMethod: CheckMethod.Standard, testTakenNick: 'itochanxxx', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Booth', url: 'https://{}.booth.pm/', category: 'East Asia', checkMethod: CheckMethod.RedirectMatch, redirectMatch: '/en', testTakenNick: 'monoliorder', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Mixi', url: 'https://mixi.jp/view_community.pl?id={}', category: 'East Asia', checkMethod: CheckMethod.PresenceMatch, presenceMatch: '| mixiコミュニティ</title>', testTakenNick: '2854333', testAvailableNick: 'zqvx8841mkw' },
  { name: 'TwitCasting', url: 'https://frontendapi.twitcasting.tv/users/{}', category: 'East Asia', checkMethod: CheckMethod.Standard, testTakenNick: 'yuno___nico', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Kwai', url: 'https://www.kwai.com/@{}', category: 'East Asia', checkMethod: CheckMethod.PresenceMatch, presenceMatch: 'name="title"', testTakenNick: 'carlito', testAvailableNick: 'zqvx8841mkw' },
  { name: 'LINE', url: 'https://line.me/R/ti/p/@{}?from=page', category: 'East Asia', checkMethod: CheckMethod.Standard, testTakenNick: 'roseareal', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Zepeto', url: 'https://gw-napi.zepeto.io/profiles/{}', category: 'East Asia', checkMethod: CheckMethod.PresenceMatch, presenceMatch: 'zepetoId":', testTakenNick: 'joe', testAvailableNick: 'zqvx8841mkw' },
  { name: 'JapanDict', url: 'https://forum.japandict.com/u/{}', category: 'East Asia', checkMethod: CheckMethod.Standard, testTakenNick: 'Yan', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Wykop', url: 'https://wykop.pl/ludzie/{}', category: 'Europe & Russia', checkMethod: CheckMethod.Standard, testTakenNick: 'test', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Kwejk', url: 'https://kwejk.pl/uzytkownik/{}#/tablica/', category: 'Europe & Russia', checkMethod: CheckMethod.Standard, testTakenNick: 'test', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Chomikuj', url: 'https://chomikuj.pl/{}/', category: 'Europe & Russia', checkMethod: CheckMethod.Standard, testTakenNick: 'test', testAvailableNick: 'zqvx8841mkw' },
  { name: 'CDA', url: 'https://www.cda.pl/{}', category: 'Europe & Russia', checkMethod: CheckMethod.Standard, testTakenNick: 'test2', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Demotywatory', url: 'https://demotywatory.pl/user/{}', category: 'Europe & Russia', checkMethod: CheckMethod.RedirectMatch, redirectMatch: 'https://demotywatory.pl/', testTakenNick: 'test', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Joe Monster', url: 'https://joemonster.org/bojownik/{}', category: 'Europe & Russia', checkMethod: CheckMethod.PresenceMatch, presenceMatch: 'jest prywatny', testTakenNick: 'dandris', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Habr', url: 'https://habr.com/en/users/{}/', category: 'Europe & Russia', checkMethod: CheckMethod.Standard, testTakenNick: 'alizar', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Pikabu', url: 'https://pikabu.ru/@{}', category: 'Europe & Russia', checkMethod: CheckMethod.Standard, testTakenNick: 'admin', testAvailableNick: 'zqvx8841mkw' },
  { name: 'OK.ru', url: 'https://ok.ru/{}', category: 'Europe & Russia', checkMethod: CheckMethod.Standard, testTakenNick: 'john', testAvailableNick: 'zqvx8841mkw' },
  { name: 'LOR', url: 'https://www.linux.org.ru/people/{}/profile', category: 'Europe & Russia', checkMethod: CheckMethod.Standard, testTakenNick: 'john', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Xakep', url: 'https://xakep.ru/author/{}/', category: 'Europe & Russia', checkMethod: CheckMethod.Standard, testTakenNick: 'tr3harder', testAvailableNick: 'zqvx8841mkw' },
  { name: '3DToday', url: 'https://3dtoday.ru/blogs/{}', category: 'Europe & Russia', checkMethod: CheckMethod.Standard, testTakenNick: 'anforma', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Risk.ru', url: 'https://risk.ru/people/{}', category: 'Europe & Russia', checkMethod: CheckMethod.Standard, testTakenNick: 'igor1', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Salon24', url: 'https://www.salon24.pl/u/{}/', category: 'Europe & Russia', checkMethod: CheckMethod.RedirectMatch, redirectMatch: 'https://www.salon24.pl/', testTakenNick: 'matuzalem', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Fotka', url: 'https://api.fotka.com/v2/user/dataStatic?login={}', category: 'Europe & Russia', checkMethod: CheckMethod.PresenceMatch, presenceMatch: '"profil":', testTakenNick: 'Asiaaa17', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Xbox', url: 'https://www.xboxgamertag.com/search/{}', category: 'Consoles & Esports', checkMethod: CheckMethod.Standard, testTakenNick: 'Spiken8', testAvailableNick: 'zqvx8841mkw' },
  { name: 'GOG', url: 'https://www.gog.com/u/{}', category: 'Consoles & Esports', checkMethod: CheckMethod.Standard, testTakenNick: 'user', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Apex Legends', url: 'https://api.tracker.gg/api/v2/apex/standard/profile/origin/{}', category: 'Consoles & Esports', checkMethod: CheckMethod.Standard, testTakenNick: 'tttcheekyttt', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Diablo', url: 'https://diablo2.io/member/{}/', category: 'Consoles & Esports', checkMethod: CheckMethod.Standard, testTakenNick: 'Mike01', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Wowhead', url: 'https://www.wowhead.com/user={}', category: 'Consoles & Esports', checkMethod: CheckMethod.Standard, testTakenNick: 'Ashelia', testAvailableNick: 'zqvx8841mkw' },
  { name: 'RuneScape', url: 'https://apps.runescape.com/runemetrics/profile/profile?user={}', category: 'Consoles & Esports', checkMethod: CheckMethod.PresenceMatch, presenceMatch: '"name":', testTakenNick: 'Thomas', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Moxfield', url: 'https://api2.moxfield.com/v1/users/{}', category: 'Consoles & Esports', checkMethod: CheckMethod.Standard, testTakenNick: 'gamer', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Game Jolt', url: 'https://gamejolt.com/site-api/web/profile/@{}/', category: 'Consoles & Esports', checkMethod: CheckMethod.Standard, testTakenNick: 'nilllzz', testAvailableNick: 'zqvx8841mkw' },
  { name: 'TruckersMP', url: 'https://truckersmp.com/user/search?search={}', category: 'Consoles & Esports', checkMethod: CheckMethod.PresenceMatch, presenceMatch: 'class="team-v2"', testTakenNick: 'JohnnySOBA', testAvailableNick: 'zqvx8841mkw' },
  { name: 'DOTAFire', url: 'https://www.dotafire.com/ajax/searchSite?text={}&search=members', category: 'Consoles & Esports', checkMethod: CheckMethod.PresenceMatch, presenceMatch: 'href="/profile/', testTakenNick: 'DotaCoachApp', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Minecraft List', url: 'https://minecraftlist.com/api/legacy/players/{}', category: 'Consoles & Esports', checkMethod: CheckMethod.PresenceMatch, presenceMatch: '"found":true', testTakenNick: 'fear837', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Jeuxvideo', url: 'https://www.jeuxvideo.com/profil/{}?mode=infos', category: 'Consoles & Esports', checkMethod: CheckMethod.Standard, testTakenNick: 'jane', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Intigriti', url: 'https://app.intigriti.com/api/user/public/profile/{}', category: 'Security & Bug Bounty', checkMethod: CheckMethod.Standard, testTakenNick: 'vampire01', testAvailableNick: 'zqvx8841mkw' },
  { name: 'YesWeHack', url: 'https://api.yeswehack.com/hunters/{}', category: 'Security & Bug Bounty', checkMethod: CheckMethod.Standard, testTakenNick: 'xel', testAvailableNick: 'zqvx8841mkw' },
  { name: 'LeakIX', url: 'https://leakix.net/u/{}', category: 'Security & Bug Bounty', checkMethod: CheckMethod.NotFoundBodyMatch, bodyMatch: '<title>LeakIX - Server error</title>', testTakenNick: 'Chocapikk', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Hudson Rock', url: 'https://cavalier.hudsonrock.com/api/json/v2/osint-tools/search-by-username?username={}', category: 'Security & Bug Bounty', checkMethod: CheckMethod.PresenceMatch, presenceMatch: 'This username is associated with a computer that was infected by an info-stealer', testTakenNick: 'testadmin', testAvailableNick: 'zqvx8841mkw' },
  { name: 'Scammer.info', url: 'https://scammer.info/u/{}.json', category: 'Security & Bug Bounty', checkMethod: CheckMethod.Standard, testTakenNick: 'AngelFat', testAvailableNick: 'zqvx8841mkw' },
];
