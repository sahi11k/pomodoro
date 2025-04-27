export function getTemplate(innerHtml) {
  const $template = document.createElement("template");
  $template.innerHTML = innerHtml;
  return $template;
}
