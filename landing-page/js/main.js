// === FAQ 交互 ===
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const item = this.parentElement;
        item.classList.toggle('active');
    });
});

// === 表单提交处理 ===
const form = document.getElementById('preRegisterForm');
const successMessage = document.getElementById('successMessage');

// Notion API 配置（从 window 对象读取）
const NOTION_API_KEY = window.NOTION_API_KEY || '';
const NOTION_DATABASE_ID = window.NOTION_DATABASE_ID || '';

// 保存到 Notion 的函数
async function saveToNotion(data) {
    if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
        console.log('Notion API 未配置，数据仅存储到 localStorage');
        return saveToLocalStorage(data);
    }

    try {
        const response = await fetch(`https://api.notion.com/v1/pages`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${NOTION_API_KEY}`,
                'Content-Type': 'application/json',
                'Notion-Version': '2022-06-28'
            },
            body: JSON.stringify({
                parent: {
                    type: 'database_id',
                    database_id: NOTION_DATABASE_ID
                },
                properties: {
                    'Email': {
                        title: [
                            {
                                text: {
                                    content: data.email
                                }
                            }
                        ]
                    },
                    'Activities': {
                        multi_select: data.activities
                    },
                    'Budget': {
                        select: {
                            name: data.budget
                        }
                    },
                    'Features': {
                        multi_select: data.features
                    },
                    'Prepay Interest': {
                        select: {
                            name: data.prepay
                        }
                    },
                    'Timestamp': {
                        date: {
                            start: new Date().toISOString()
                        }
                    }
                }
            })
        });

        if (!response.ok) {
            throw new Error('Failed to save to Notion');
        }

        return true;
    } catch (error) {
        console.error('Notion API Error:', error);
        // 降级到本地存储
        return saveToLocalStorage(data);
    }
}

// 保存到 localStorage（备用方案）
function saveToLocalStorage(data) {
    let submissions = JSON.parse(localStorage.getItem('habitloop_submissions') || '[]');
    submissions.push({
        ...data,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('habitloop_submissions', JSON.stringify(submissions));
    return true;
}

// 表单提交事件
form.addEventListener('submit', async function(e) {
    e.preventDefault();

    // 收集表单数据
    const formData = {
        email: document.getElementById('email').value,
        activities: Array.from(document.querySelectorAll('input[name="activities"]:checked'))
            .map(el => el.value),
        budget: document.querySelector('input[name="budget"]:checked')?.value || '10-20',
        features: Array.from(document.querySelectorAll('input[name="features"]:checked'))
            .map(el => el.value),
        prepay: document.querySelector('input[name="prepay"]:checked')?.value || 'no'
    };

    // 验证
    if (!formData.email) {
        alert('请填写邮箱地址');
        return;
    }

    // 提交中状态
    const submitBtn = form.querySelector('.submit-button');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = '提交中...';

    try {
        // 保存数据
        await saveToNotion(formData);

        // 显示成功消息
        form.style.display = 'none';
        successMessage.classList.remove('hidden');

        // 滚动到成功消息
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

    } catch (error) {
        alert('提交失败，请稍后重试');
        console.error(error);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
});

// === 平滑滚动 ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// === 导航栏滚动效果 ===
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// === 数据导出工具（用于本地存储模式） ===
// 在浏览器控制台输入 exportSubmissions() 可以导出数据
window.exportSubmissions = function() {
    const submissions = JSON.parse(localStorage.getItem('habitloop_submissions') || '[]');
    const csv = [
        ['Email', 'Activities', 'Budget', 'Features', 'Prepay Interest', 'Timestamp'],
        ...submissions.map(s => [
            s.email,
            s.activities.join(', '),
            s.budget,
            s.features.join(', '),
            s.prepay,
            s.timestamp
        ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `habitloop_submissions_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    console.log(`已导出 ${submissions.length} 条数据`);
};
