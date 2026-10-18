function updateDateTime() {
                    const now = new Date();
                    const options = {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hours: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                    };
                    documeny.getElementById('datatime').textContent=now.toLocaleDateString('en-US', options);
                }
                updateDateTime();
                setInterval(updateDateTime, 1000)