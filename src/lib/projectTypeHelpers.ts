import { ProjectType } from '@graphql/__generated__/codegen';

export function projectTypeToString(projectType: ProjectType): string {
  switch (projectType) {
    case ProjectType.FIELD_L1:
      return 'L1 field';
    case ProjectType.FIELD_L2:
      return 'L2 field';
    case ProjectType.FIELD_M50:
      return 'M50 field';
    case ProjectType.FIELD_FLAT:
      return 'Flat field';
    case ProjectType.FIELD_CROSS_L1:
      return 'L1 crossfield';
    case ProjectType.FIELD_CROSS_L2:
      return 'L2 crossfield';
    case ProjectType.FIELD_CROSS_M50:
      return 'M50 crossfield';
    case ProjectType.FIELD_CIRCLE:
      return 'Circle field';
    case ProjectType.WALL_X:
      return 'X-wall';
    case ProjectType.WALL_S:
      return 'S-wall';
    case ProjectType.WALL_T:
      return 'T-wall';
    case ProjectType.WALL_SPEED:
      return 'Speed wall';
    case ProjectType.WALL_CUBE:
      return 'Cube wall';
    case ProjectType.WALL_OCTO:
      return 'Octo-wall';
    case ProjectType.FALLWALL:
      return 'Fallwall';
    case ProjectType.SPIRAL:
      return 'Spiral';
    case ProjectType.STRUCTURE:
      return 'Structure';
    case ProjectType.FREE_HAND:
      return 'Free hand';
    case ProjectType.DECOR:
      return 'Decor';
    case ProjectType.OTHER:
      return 'Other';
  }
}
