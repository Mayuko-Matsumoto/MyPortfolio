import { Mastra } from '@mastra/core/mastra';
import { portfolioAgent } from './agents/portfolio-agent.ts';

export const mastra = new Mastra({
  agents: { portfolioAgent },
});
