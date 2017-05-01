export function mainImage(project) {
  if (project.images.length > 0) {
    return project.images[0];
  } else {
    return {
      id: 0,
      name: null,
      url: 'https://i.imgur.com/19jCEX4.jpg',
    };
  }
}
