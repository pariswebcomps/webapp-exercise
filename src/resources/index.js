export function configure(config) {
  config.globalResources([
    './elements/skill-tags.html',
    './elements/social-links.html',
    './value-converters/capitalize',
    './value-converters/uppercase'
  ]);
}
