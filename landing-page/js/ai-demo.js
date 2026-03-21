// === AI Demo 交互逻辑 ===

// 状态管理
const state = {
    currentScene: 1,
    completedScenes: new Set(),
    totalScenes: 4
};

// DOM 元素
const elements = {
    sceneTabs: document.querySelectorAll('.scene-tab'),
    scenes: document.querySelectorAll('.scene'),
    progressFill: document.getElementById('progressFill'),
    progressText: document.getElementById('progressText'),
    completionMessage: document.getElementById('completionMessage'),
    finalCompleteBtn: document.getElementById('finalCompleteBtn')
};

// === 场景切换 ===
function switchScene(sceneNum) {
    state.currentScene = sceneNum;

    // 更新标签
    elements.sceneTabs.forEach(tab => {
        tab.classList.toggle('active', parseInt(tab.dataset.scene) === sceneNum);
    });

    // 更新场景
    elements.scenes.forEach(scene => {
        scene.classList.toggle('active', scene.id === `scene${sceneNum}`);
    });

    // 滚动到场景
    document.getElementById(`scene${sceneNum}`).scrollIntoView({ behavior: 'smooth' });
}

// 场景标签点击
elements.sceneTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        switchScene(parseInt(tab.dataset.scene));
    });
});

// === 场景 1: Prompt 练习 ===
const practiceOptions = document.querySelectorAll('.option-btn');
const practiceFeedback = document.getElementById('practiceFeedback');

practiceOptions.forEach(btn => {
    btn.addEventListener('click', () => {
        const isCorrect = btn.dataset.correct === 'true';

        practiceOptions.forEach(opt => {
            opt.classList.remove('correct', 'wrong');
        });

        if (isCorrect) {
            btn.classList.add('correct');
            practiceFeedback.textContent = '✅ 太棒了！这个 Prompt 包含了主体、场景、风格，能生成更好的图片！';
            practiceFeedback.className = 'practice-feedback show success';
            markSceneCompleted(1);
        } else {
            btn.classList.add('wrong');
            practiceFeedback.textContent = '❌ 这个 Prompt 还是太简单了，试试包含更多细节？';
            practiceFeedback.className = 'practice-feedback show error';
        }
    });
});

// === 场景 2: AI 绘图 ===
const styleCards = document.querySelectorAll('.style-card');
const artResult = document.getElementById('artResult');

const styleDescriptions = {
    realistic: { title: '写实风格', desc: '像真的一样！' },
    anime: { title: '动漫风格', desc: '超可爱的二次元风～' },
    watercolor: { title: '水彩风格', desc: '温柔治愈的水彩质感' },
    pixel: { title: '像素风格', desc: '复古游戏的像素风！' }
};

styleCards.forEach(card => {
    card.addEventListener('click', () => {
        const style = card.dataset.style;
        const info = styleDescriptions[style];

        styleCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');

        artResult.innerHTML = `
            <div class="art-result-inner">
                <h4>${info.title}</h4>
                <p style="font-size: 48px;">🐱</p>
                <p>${info.desc}</p>
                <p class="result success">这就是 ${info.title} 的效果！</p>
            </div>
        `;
        artResult.classList.add('has-image');

        markSceneCompleted(2);
    });
});

// === 场景 3: 学习路径 ===
const pathWeeks = document.querySelectorAll('.path-week');

pathWeeks.forEach(week => {
    week.addEventListener('click', () => {
        pathWeeks.forEach(w => w.classList.remove('active'));
        week.classList.add('active');
        markSceneCompleted(3);
    });
});

// === 场景 4: 打卡奖励 ===
const taskCheckboxes = document.querySelectorAll('.task-item input');
const checkinBtn = document.getElementById('checkinBtn');

taskCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        const checked = Array.from(taskCheckboxes).filter(c => c.checked).length;
        checkinBtn.disabled = checked === 0;
        if (checked > 0) {
            markSceneCompleted(4);
        }
    });
});

checkinBtn.addEventListener('click', () => {
    if (confirm('确认今日打卡吗？')) {
        alert('✅ 打卡成功！+10 积分');
        // 切换周六状态
        const saturday = document.querySelector('.day.pending');
        saturday.classList.remove('pending');
        saturday.classList.add('checked');
        saturday.querySelector('.day-status').textContent = '✓';
    }
});

// 完成按钮
document.querySelectorAll('.complete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const sceneNum = parseInt(btn.dataset.scene);
        markSceneCompleted(sceneNum);

        if (sceneNum < 4) {
            switchScene(sceneNum + 1);
        } else {
            showCompletion();
        }
    });
});

// === 最终完成 ===
function showCompletion() {
    elements.completionMessage.style.display = 'block';
    elements.completionMessage.scrollIntoView({ behavior: 'smooth' });
    elements.finalCompleteBtn.style.display = 'none';
}

// === 进度管理 ===
function markSceneCompleted(sceneNum) {
    state.completedScenes.add(sceneNum);
    updateProgress();
}

function updateProgress() {
    const progress = (state.completedScenes.size / state.totalScenes) * 100;
    elements.progressFill.style.width = `${progress}%`;
    elements.progressText.textContent = state.completedScenes.size;

    // 更新场景标签状态
    state.completedScenes.forEach(sceneNum => {
        const tab = document.querySelector(`.scene-tab[data-scene="${sceneNum}"]`);
        if (tab) {
            tab.classList.add('completed');
        }
    });
}

// === 平滑滚动 ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// === 初始化 ===
switchScene(1);
