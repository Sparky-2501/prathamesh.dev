/**
 * COMPETITIVE PROGRAMMING - edit this file only.
 *
 * CODOLIO_URL: your public Codolio profile. Replace it with your own link,
 * e.g. "https://codolio.com/profile/your-username"
 *
 * Update the numbers whenever you like - they animate on scroll.
 * `value` = number that counts up, `suffix` = shown after it (e.g. "+").
 */
import { SiCodechef, SiLeetcode } from "react-icons/si";

export const CODOLIO_URL = "https://codolio.com/"; // TODO: replace with your profile link

export const headline = {
  total: { value: 1000, suffix: "+", label: "problems solved multiple platforms" },
};

export const platforms = [
  {
    name: "CodeChef",
    handle: "patu_143",
    url: "https://www.codechef.com/users/patu_143",
    icon: SiCodechef,
    color: "#d9a066",
    stats: [
      { label: "Solved", value: 600, suffix: "+" },
      { label: "Rating", value: 1400, suffix: "+" },
      { label: "Stars", text: "2★" },
    ],
  },
  {
    name: "LeetCode",
    handle: "Sparky-2501",
    url: "https://leetcode.com/Sparky-2501/",
    icon: SiLeetcode,
    color: "#ffa116",
    stats: [
      { label: "Solved", value: 300, suffix: "+" },
      { label: "Rank", value: 423274, suffix: "+" }
    ],
  },
];
