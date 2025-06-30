function setMaxHours() {
    const abo = document.querySelector('input[name="abo"]:checked').value;
    let maxHours = abo === "match" ? 168 : 336;
    document.getElementById("hours").value = maxHours;
}

// 페이지 로딩 시 ABO에 맞게 자동으로 시간 세팅
window.onload = function() {
    setMaxHours();
}

// 이후 라디오 버튼을 변경하면 자동으로 시간 입력
document.querySelectorAll('input[name="abo"]').forEach(function(elem) {
    elem.addEventListener("change", setMaxHours);
});

function calculateDose() {
    const weight = parseFloat(document.getElementById("weight").value);
    let hours = parseFloat(document.getElementById("hours").value);
    const abo = document.querySelector('input[name="abo"]:checked').value;

    if (isNaN(weight) || isNaN(hours) || weight <= 0 || hours <= 0) {
        alert("체중과 투여 시간을 올바르게 입력하세요.");
        return;
    }

    let maxHours = abo === "match" ? 168 : 336;

    if (hours > maxHours) {
        alert(`입력된 투여 시간이 ABO ${abo === "match" ? "일치" : "불일치"} 최대 시간(${maxHours}hr)를 초과했습니다.\n자동으로 최대치로 조정합니다.`);
        hours = maxHours;
        document.getElementById("hours").value = maxHours;
    }

    const totalDose = 0.6 * weight * hours;
    const ampoules = Math.ceil(totalDose / 10);

    document.getElementById("result").innerHTML = 
        `총 투여량: <strong>${totalDose.toFixed(2)} mcg</strong><br>` +
        `필요 앰플 수: <strong>${ampoules} 개</strong><br>` +
        `(최대 투여 시간: ${hours} hr)`;
}
