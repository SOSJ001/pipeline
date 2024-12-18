import { getResources, storeResource } from '../repo/projectContributionsRepo.js';
import { getMultipleProfiles } from '../repo/userProfileRepo.js';

export async function getProjectResource(projectId) {
  const resources = await getResources(projectId);

  const userIds = resources.map((resource) => resource.user_id);

  const profiles = await getMultipleProfiles(userIds);

  const profilesByUserId = profiles.reduce((acc, profile) => {
    acc[profile.user_id] = profile;
    return acc;
  }, {});

  const resourcesWithProfiles = resources.map((resource) => ({
    ...resource,
    user_profile: profilesByUserId[resource.user_id] || null, // Add profile or null if not found
  }));

  return resourcesWithProfiles;
}

export async function storeProjectResource(resourceData) {
  const res = await storeResource(resourceData);

  return res;
}
