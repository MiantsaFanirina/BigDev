export function capitalizeString(str) {
    // Split the string into an array of words
    let words = str.split(' ');
  
    // Capitalize the first letter of each word
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
  
    // Join the words back into a string
    return words.join(' ');
}

export function formaterDate(dateStr) {
  const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' };
  const dateObj = new Date(dateStr);
  const dateFormatee = dateObj.toLocaleDateString('fr-FR', options);

  return dateFormatee;
}
