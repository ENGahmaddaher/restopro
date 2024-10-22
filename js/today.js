document.addEventListener('DOMContentLoaded', function () {

    // Napkin color changing
    const napkinColorOptions = document.querySelectorAll('.color-option');
    const napkin = document.getElementById('napkin');
    const utensilsSlot = document.getElementById('utensilsSlot'); // فتحة المنديل
  
    napkinColorOptions.forEach(option => {
      option.addEventListener('click', function () {
        const selectedColor = this.getAttribute('data-color');
        napkin.style.backgroundColor = selectedColor;
        utensilsSlot.style.backgroundColor = selectedColor; // تغير لون الفتحة بناءً على لون المنديل
      });
    });
  
    // Utensils cover color changing
    const coverColorPicker = document.getElementById('coverColorPicker');
    const utensilsCover = document.getElementById('utensilsCover');
  
    coverColorPicker.addEventListener('input', function () {
      const selectedColor = this.value;
      utensilsCover.style.backgroundColor = selectedColor; // تغير لون الغلاف فقط
    });
  
    // Logo upload and resizing
    const logoUploader = document.getElementById('logoUploader');
    const userLogo = document.getElementById('userLogo');
    const uploadLogoBtn = document.getElementById('uploadLogoBtn');
  
    uploadLogoBtn.addEventListener('click', function () {
      logoUploader.click();
    });
  
    logoUploader.addEventListener('change', function (event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          userLogo.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  
    // Allow resizing of the logo
    let resizing = false;
    let startWidth, startHeight, startX, startY;
  
    userLogo.addEventListener('mousedown', function (e) {
      resizing = true;
      startWidth = userLogo.offsetWidth;
      startHeight = userLogo.offsetHeight;
      startX = e.clientX;
      startY = e.clientY;
      document.body.style.cursor = 'nwse-resize';
    });
  
    document.addEventListener('mousemove', function (e) {
      if (resizing) {
        const newWidth = startWidth + (e.clientX - startX);
        const newHeight = startHeight + (e.clientY - startY);
        userLogo.style.width = newWidth + 'px';
        userLogo.style.height = newHeight + 'px';
      }
    });
  
    document.addEventListener('mouseup', function () {
      resizing = false;
      document.body.style.cursor = 'default';
    });
  
    // Screenshot functionality
    const screenshotBtn = document.getElementById('screenshotBtn');
    screenshotBtn.addEventListener('click', function () {
      html2canvas(document.querySelector('.napkin-container')).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'utensils-cover-screenshot.png';
        link.click();
      });
    });
  
    // Save changes
    const saveChangesBtn = document.getElementById('saveChangesBtn');
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');
    const userPhone = document.getElementById('userPhone');
  
    saveChangesBtn.addEventListener('click', function () {
      if (userName.value && userEmail.value && userPhone.value) {
        const userData = {
          name: userName.value,
          email: userEmail.value,
          phone: userPhone.value,
        };
  
        localStorage.setItem('userData', JSON.stringify(userData));
        alert('Changes saved successfully!');
      } else {
        alert('Please fill in all fields.');
      }
    });
  
    // Handle page reload (Clear all changes)
    window.addEventListener('load', function () {
      localStorage.removeItem('userData');
      userLogo.src = 'user-logo-placeholder.png';
      napkin.style.backgroundColor = '#ffffff';
      utensilsCover.style.backgroundColor = '#f0f0f0';
      userName.value = '';
      userEmail.value = '';
      userPhone.value = '';
    });
  });
  