function serializeForm(form) {
  if (!form || !form.elements) return;
  const data = {};

  [...form.elements].forEach(el => {
    if (!el.value) return;

    switch (el.type) {
      case 'radio':
        if (el.checked) {
          data[el.name] = el.value;
        }
        break;
      case 'checkbox':
        data[el.name] = el.checked;
        break;
      default:
        data[el.name] = el.value;
        break;
    }
  })

  return data;
}

export default serializeForm;
