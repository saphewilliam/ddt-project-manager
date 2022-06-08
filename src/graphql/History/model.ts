import { ProjectHistory, StoneInventoryHistory, AttributeInventoryHistory } from 'nexus-prisma';
import { nexusModel } from '@lib/nexusHelpers';

export const projectHistoryModel = nexusModel(ProjectHistory);
export const stoneInventoryHistoryModel = nexusModel(StoneInventoryHistory);
export const attributeInventoryHistoryModel = nexusModel(AttributeInventoryHistory);
