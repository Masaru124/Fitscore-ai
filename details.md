

# VISVESVARAYA TECHNOLOGICAL UNIVERSITY


"Jnana Sangama", Belagavi, KARNATAKA - 590018


Project Phase-1(BCD685) Report
On
"FitScore AI: A Real-Time Exercise Quality Scoring System using Pose Estimation
and Deep-Learning"
Submitted in Partial fulfillment of the requirement for the award of degree


Of


Bachelor of Engineering
In
Science & Engineering (Data Science)


Computer
Of Visvesvaraya Technological University, Belagavi.
Submitted by:
Preethi R (1AM23CD078)
Ramyashri Ravikumar (1AM23CD086)
Vaishnavi G N(1AM23CD115)
Vaishnavi S (1AM23CD116)
Under the Guidance of:
Prof. Yashaswini C D
Assistant Professor
Dept. of CSE(DS)


DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING
(Data Science)
AMC ENGINEERING COLLEGE
(Autonomous under Visvesvaraya Technological University, Belagavi)
18th K.M. Bannerghatta Main Road, Bengaluru - 560083
Academic Year 2025-26




## AMC ENGINEERING COLLEGE


(Autonomous under Visvesvaraya Technological University, Belagavi)
18th K.M. Bannerghatta Main Road, Bengaluru - 560083


### DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING


### (Data Science)


### CERTIFICATE


This is to certify that the project work entitled "FitScore AI: A Real-Time Exercise Quality
Scoring System using Pose Estimation and Deep-Learning" carried out by bonafide
students Preethi R (1AM23CD078), Ramyashri Ravikumar (1AM23CD086), Vaishnavi G N
(1AM23CD115), Vaishnavi S (1AM23CD116) of AMC Engineering College, in partial
fulfillment for the award of Bachelor of Engineering in Computer Science and Engineering
(Data Science) of the Visvesvaraya Technological University, Belagavi during the year 2025-
2026. It is certified that all corrections/suggestions indicated for internal assessment have been
incorporated in the report. The Project Phase-1(BCD685) report has been approved as it
satisfies the academic requirements in respect of project work prescribed for said Bachelor of
Engineering degree.


### Guide


Prof. Yashaswini C D
Assistant Professor
Dept. of CSE(DS)


### HOD Principal


Dr. Y Sarojini Dr. Yuvaraju B N


Professor and HOD
Dept. of CSE(DS)


Principal
AMC Engineering College




AMC ENGINEERING COLLEGE
(Autonomous under Visvesvaraya Technological University, Belagavi)
18th K.M. Bannerghatta Main Road, Bengaluru - 560083


DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING
(Data Science)


DECLARATION


We the undersigned students of 6th semester in Department of Computer Science and Engineering
(Data Science), AMC Engineering College, declare that our project work entitled "FitScore AI: A
Real-Time Exercise Quality Scoring System using Pose Estimation and Deep-Learning"
is a bonafide work of ours. Our Project Phase-1(BCD685) is neither a copy nor by means a modification
of any other engineering Project Phase-1(BCD685). We also declare that this project was not entitled
for submission to any other university in the past and shall remain the only submission made and will
not be submitted by us to any other university in the future.


Name
Preethi R
Ramyashri Ravikumar
Vaishnavi G N
Vaishnavi S


USN Signature
1AM23CD078
1AM23CD086
1AM23CD115
1AM23CD116




## ABSTRACT


FitScore AI is a web-based exercise assessment tool that uses MediaPipe BlazePose and a
CNN-LSTM hybrid architecture to provide real-time, three-dimensional biomechanical
scoring for fitness and tele-rehabilitation. The system replaces binary feedback with the
FitScore metric, a 0-100 index that looks at joint alignment, range of motion, symmetry, and
tempo. This allows for more detailed long-term tracking and the AI-driven risk stratification
engine finds patterns of compensation that are likely to lead to injury. The platform is inclusive
thanks to a pose normalization layer and a context-aware LLM assistant for personalized
coaching. It also makes medical-grade reports and muscle activation heatmaps using a standard
webcam and a React/FastAPI full-stack architecture.


Keywords: Exercise Quality Scoring, Pose Estimation, CNN-LSTM, FitScore Metric,
Biomechanical Analysis, MediaPipe, Movement Symmetry, Healthcare Analytics, Deep
Learning, Real-Time Feedback, Tele-Rehabilitation, Injury Risk Detection, and Adaptive
Coaching




## ACKNOWLEDGEMENT


We are pleased to present this report as part of our academic journey in the Department of
Computer Science and Engineering (Data Science) at AMC Engineering College, Bengaluru - 83.
The successful completion of this work gives us immense satisfaction and learning, and we take this
opportunity to express our gratitude to all who supported and guided us throughout.


First and foremost, we express our heartfelt thanks to Dr. K.R.Paramahamsa, Chairman,
AMC Engineering College, for providing us with the opportunity and the environment to pursue
quality education and practical learning.


We extend our sincere gratitude to Dr. Yuvaraju B. N., Principal, for granting us permission
and providing continuous encouragement in carrying out this academic work successfully.


We are deeply thankful to Dr. Y. Sarojini, Professor and Head, Department of Computer
Science and Engineering (Data Science), for her valuable guidance, support, and motivation
throughout the course.


We sincerely thank our Coordinator, Prof. Yashaswini C D, Assistant Professor, Department
of CSE (DS), for her encouragement and timely suggestions that helped us move forward with clarity
and confidence.


We express our special thanks to our Guide, Prof. Yashaswini C D, Assistant Professor,
Department of CSE (DS), for her continuous support, technical guidance, and insightful feedback,
which played a key role in the successful completion of this academic task.


We are grateful to our friends and classmates for their encouragement and support throughout
the process.


Last but not the least, we would like to express our heartfelt gratitude to our parents for their
unwavering support, understanding, and blessings, which have been the foundation of our success.


Name
Preethi R
Ramyashri Ravikumar
Vaishnavi G N
Vaishnavi S


USN
1AM23CD078
1AM23CD086
1AM23CD115
1AM23CD116




## TABLE OF CONTENTS


<table>
 <tr>
  <th></th>
  <th>TITLE</th>
  <th>PAGE NO</th>
 </tr>
 <tr>
  <td></td>
  <td>Abstract</td>
  <td>i</td>
 </tr>
 <tr>
  <td></td>
  <td>Acknowledgment</td>
  <td>ii</td>
 </tr>
 <tr>
  <td></td>
  <td>Table of contents</td>
  <td>iii</td>
 </tr>
 <tr>
  <td></td>
  <td>List of Figures</td>
  <td>iv</td>
 </tr>
 <tr>
  <td></td>
  <td>List of Tables</td>
  <td>v</td>
 </tr>
 <tr>
  <td>CHAPTER 1</td>
  <td>INTRODUCTION</td>
  <td>1</td>
 </tr>
 <tr>
  <td>1.1</td>
  <td>Purpose of Project</td>
  <td>1</td>
 </tr>
 <tr>
  <td>1.2</td>
  <td>Scope of Project</td>
  <td>2</td>
 </tr>
 <tr>
  <td>1.3</td>
  <td>Existing System</td>
  <td>2</td>
 </tr>
 <tr>
  <td>1.3.1</td>
  <td>Disadvantages of Existing System</td>
  <td>3</td>
 </tr>
 <tr>
  <td>1.4</td>
  <td>Problem Statement</td>
  <td>3</td>
 </tr>
 <tr>
  <td>1.5</td>
  <td>Proposed System</td>
  <td>4</td>
 </tr>
</table>


Summary


CHAPTER 2 LITERATURE SURVEY


2.1 Literature Study
Summary


CHAPTER 3 SYSTEM ANALYSIS


1. Methodology


3.2 Expected outcome
Summary


CHAPTER 4 SYSTEM REQUIREMENTS


1. Functional Requirements


4.2 Non-functional Requirements


4.3 Basic Operational Requirements
Summary


CHAPTER 5 SYSTEM DESIGN


1. System Architecture


5.2 Use Case Diagram


1. Sequence Diagram


5.4 Dataflow Diagram
Summary


4
5
5
6
7
7
7
8
9
9
9
10
11
12
12
12
14
15
17




### REFERENCES


#### APPENDICES


PUBLICATION DETAILS


18
19
20




## LIST OF FIGURES


FIG. NO.


1. 


5.2


5.3


Use Case Diagram
Sequence Diagram
Data-flow Diagram


FIGURE NAME


PAGE NO.
14
15
16




FitScore AI: A Real-Time Exercise Quality Scoring System using Pose Es ma on and Deep-Learning


### CHAPTER 1


### INTRODUCTION


Advancements in Artificial Intelligence, Computer Vision, and Deep Learning have
significantly improved human pose estimation and exercise monitoring systems [1]. With the
increasing popularity of online fitness platforms and tele-rehabilitation services, there is a
growing demand for intelligent systems capable of analyzing exercise posture and movement
quality in real time.


Traditional exercise assessment methods mainly rely on wearable sensors, physiotherapists, or
expensive motion capture systems, which are often inaccessible for regular users [4]. Existing
fitness applications generally provide only basic feedback and lack detailed biomechanical
analysis and injury risk detection [3].


Recent developments in pose estimation frameworks and rehabilitation support systems have
enabled real-time skeletal tracking and exercise analysis using standard cameras [1][2]. Deep
learning techniques such as Convolutional Neural Networks (CNN) and Long Short-Term
Memory (LSTM) networks are widely used for movement sequence analysis and rehabilitation
exercise assessment [3].


The proposed system, FitScore AI, utilizes pose estimation and deep learning techniques to
evaluate exercise quality using a standard webcam. The system analyzes posture alignment,
movement symmetry, range of motion, and exercise tempo to generate a FitScore metric and
provide personalized corrective feedback for fitness monitoring and tele-rehabilitation
applications [2][7].


### 1.1 PURPOSE OF PROJECT


The primary purpose of FitScore AI is to provide an intelligent and accessible platform for
analyzing human exercise posture and movement quality in real time. Existing exercise
monitoring systems mainly rely on wearable sensors, manual observation, or expensive motion
capture systems that are difficult to access for ordinary users [4].


The proposed system utilizes pose estimation and deep learning technologies to bridge the gap
between professional biomechanical assessment and home-based fitness practice. The platform


DEPT.OF CSE(DS), AMCEC 2025-26


### pg. 1




FitScore AI: A Real-Time Exercise Quality Scoring System using Pose Es ma on and Deep-Learning


uses CNN-LSTM architecture to analyze exercise movements and evaluate posture alignment,
movement symmetry, range of motion, and exercise tempo [3].


The system introduces a FitScore metric ranging from 0 to 100, enabling users to receive
detailed and measurable feedback regarding exercise quality. Additionally, the platform
provides injury risk detection, personalized corrective guidance, and AI-powered adaptive
coaching support for tele-rehabilitation and fitness applications [2][5].


### 1.2 SCOPE OF PROJECT


The scope of FitScore AI focuses on developing a real-time exercise quality assessment
platform capable of monitoring and evaluating human body movements through webcam-
based pose estimation and deep learning techniques. The project aims to provide an accessible
browser-based system without requiring expensive hardware or wearable devices [2]. The
system performs real-time body landmark extraction and analyzes exercise movements using
CNN-LSTM deep learning architecture [3]. The platform evaluates exercise quality using
multiple biomechanical parameters including joint alignment, range of motion, movement
symmetry, posture stability, and exercise tempo. The project additionally includes injury risk
detection, adaptive AI coaching, analytical reporting, and longitudinal performance tracking
for fitness monitoring and tele-rehabilitation applications [5][6]. Currently, the implementation
supports exercises such as squats, lunges, push-ups, and bicep curls.


### 1.3 EXISTING SYSTEM


Several existing systems have been developed for exercise monitoring and rehabilitation
support using wearable sensors, computer vision techniques, and motion capture technologies.
Wearable devices mainly focus on tracking parameters such as heart rate, calories burned, and
activity levels but lack detailed biomechanical analysis capabilities [4].


Marker-based motion capture systems used in rehabilitation laboratories provide accurate
movement analysis through specialized hardware setups. However, these systems are
expensive and unsuitable for general public usage or home-based fitness applications [4].


DEPT.OF CSE(DS), AMCEC 2025-26


### pg. 2




FitScore AI: A Real-Time Exercise Quality Scoring System using Pose Es ma on and Deep-Learning


Computer vision-based frameworks such as OpenPose introduced skeletal tracking using deep
learning techniques [1]. Although these systems improved accessibility, most frameworks
focus primarily on pose detection rather than detailed exercise quality assessment and injury
risk analysis.


Several rehabilitation support systems additionally use machine learning and pose estimation
models for exercise classification and physiotherapy monitoring [6][7]. However, many
existing systems still lack quantitative scoring mechanisms, adaptive coaching support, and
longitudinal analytical reporting.


### 1.3.1 DISADVANTAGES OF EXISTING SYSTEM


The major disadvantages of existing systems are:


- Dependence on expensive hardware and wearable sensors [4].

- Lack of accurate real-time biomechanical analysis [1].

- Provision of only binary feedback without comprehensive quality scoring [3].

- Absence of injury risk detection and adaptive coaching support [5].

- Limited accessibility for tele-rehabilitation and home-based users.

- Lack of longitudinal performance tracking and analytical reporting [6].


### 1.4 PROBLEM STATEMENT


Existing fitness and rehabilitation systems fail to provide an accurate and detailed
biomechanical analysis in real time using affordable and accessible technologies. Most current
systems rely on wearable sensors, manual supervision, or expensive motion capture
laboratories for posture assessment and movement tracking [4].


Many existing fitness applications provide only simple feedback such as "correct" or
"incorrect" posture without explaining movement errors or injury risks [3]. As a result, users
may continue performing exercises incorrectly, leading to muscle strain, joint pain, and
ineffective rehabilitation outcomes.


DEPT.OF CSE(DS), AMCEC 2025-26


### pg. 3




FitScore AI: A Real-Time Exercise Quality Scoring System using Pose Es ma on and Deep-Learning


Therefore, there is a need for an intelligent exercise quality assessment system capable of
providing real-time posture analysis, injury risk detection, personalized corrective guidance,
and analytical reporting using only a standard webcam. The proposed FitScore AI platform
addresses these limitations using pose estimation, deep learning, and rehabilitation-focused AI
technologies [2][5].


### 1.5 PROPOSED SYSTEM


The proposed system, FitScore AI, is an intelligent browser-based exercise quality assessment
platform designed to analyze human posture and movement quality in real time using Artificial
Intelligence and Computer Vision techniques.


The system utilizes pose estimation technology to extract body landmarks from webcam video
streams and processes the skeletal data using CNN-LSTM deep learning architecture [2][3].
The platform evaluates exercise quality based on joint alignment, range of motion, movement
symmetry, posture stability, and exercise tempo.


The generated FitScore metric provides users with measurable feedback regarding exercise
performance. The platform additionally includes an AI-driven injury risk stratification engine
capable of identifying abnormal movement patterns and posture deviations [5].


The system also integrates adaptive corrective guidance and rehabilitation-focused feedback
mechanisms for improving exercise quality and posture correction [7]. Analytical reports,
longitudinal performance tracking, and exercise monitoring are additionally supported for tele-
rehabilitation and healthcare applications [8].


### SUMMARY


This chapter introduced the FitScore AI system and explained the need for intelligent exercise
quality assessment platforms. The chapter discussed the limitations of existing systems and
highlighted the importance of pose estimation, deep learning, and rehabilitation-focused
technologies in improving posture analysis and exercise monitoring. The proposed system
provides real-time posture evaluation, injury risk detection, corrective feedback, and analytical
reporting using browser-based architecture.


DEPT.OF CSE(DS), AMCEC 2025-26


### pg. 4




FitScore AI: A Real-Time Exercise Quality Scoring System using Pose Es ma on and Deep-Learning


### CHAPTER 2


### LITERATURE SURVEY


The Literature Survey chapter reviews various research works related to pose estimation,
rehabilitation monitoring, exercise recognition, and deep learning-based posture analysis
systems. Several studies have explored the use of Artificial Intelligence and Computer Vision
technologies for skeletal tracking and exercise quality assessment [1][3].


The survey focuses on recent advancements in pose estimation frameworks, rehabilitation
support systems, machine learning-based exercise analysis, and physiotherapy monitoring
applications [2][7].


### 2.1 LITERATURE STUDY


Several research works have focused on pose estimation, exercise recognition, and
rehabilitation monitoring using Artificial Intelligence and Deep Learning technologies.


Cao et al. proposed OpenPose, a real-time multi-person 2D pose estimation framework using
Part Affinity Fields and Convolutional Neural Networks [1]. The framework enabled efficient
skeletal tracking but lacked detailed biomechanical analysis required for exercise quality
assessment.


Woo and Jeong proposed a real-time remote exercise assessment system using human pose
estimation and relative phase analysis [2]. The system demonstrated the effectiveness of pose
estimation for exercise monitoring and rehabilitation support.


Liao et al. developed a CNN-LSTM-based rehabilitation assessment framework for analyzing
physical exercise movements [3]. The model successfully classified rehabilitation exercises but
lacked personalized corrective feedback and adaptive coaching support.


Recent rehabilitation studies additionally explored machine learning pose estimation models
and physiotherapy exercise classification systems for posture monitoring and corrective
guidance [6][7]. These systems demonstrated improved accessibility but still lacked integrated
quality scoring and longitudinal performance tracking.


The literature survey reveals that most existing systems focus mainly on pose estimation or
exercise recognition and fail to provide integrated quality scoring, injury risk detection,


DEPT.OF CSE(DS), AMCEC 2025-26


### pg. 5




FitScore AI: A Real-Time Exercise Quality Scoring System using Pose Es ma on and Deep-Learning


adaptive coaching, and analytical reporting. The proposed FitScore AI platform addresses these
limitations through the integration of pose estimation, CNN-LSTM deep learning architecture,
healthcare analytics, and rehabilitation-focused AI support.


[1] OpenPose: Realtime Multi-Person 2D Pose Estimation using Part Affinity Fields


Publishing Year: 2021


Cao et al. proposed OpenPose, a real-time multi-person 2D pose estimation framework based
on Convolutional Neural Networks and Part Affinity Fields. The system is capable of
accurately detecting human body keypoints and tracking multiple individuals simultaneously.
It significantly improved real-time skeletal tracking performance and is widely used in
applications like fitness tracking and motion analysis. However, the framework mainly focuses
on pose detection and does not provide deeper biomechanical analysis or exercise quality
assessment required for rehabilitation monitoring.


[2] Exercise Assessment based on Human Pose Estimation and Relative Phase for Real-


Time Remote Exercise System


Publishing Year: 2024


Woo and Jeong (2024) developed a real-time remote exercise assessment system using human
pose estimation and relative phase analysis. The system evaluates dynamic exercise
movements by analyzing joint positions and velocities, enabling accurate posture assessment
during exercises such as barbell squats. A one-dimensional deep learning model was used to
classify exercise performance, achieving over 95% accuracy. The system is particularly useful
for remote rehabilitation and fitness monitoring. However, the study has limitations, including
the lack of personalized coaching features and long-term user performance tracking.


### SUMMARY


This chapter reviewed various research works related to pose estimation, exercise recognition,
and rehabilitation monitoring. The literature survey identified limitations in existing systems,
including lack of detailed biomechanical analysis, absence of injury risk detection, and limited
accessibility. The proposed FitScore AI system addresses these challenges through real-time
exercise quality assessment and AI-powered adaptive feedback.


DEPT.OF CSE(DS), AMCEC 2025-26


### pg. 6




FitScore AI: A Real-Time Exercise Quality Scoring System using Pose Es ma on and Deep-Learning


### CHAPTER 3


### SYSTEM ANALYSIS


The System Analysis chapter describes the methodology, workflow, and expected outcomes of
the proposed FitScore AI platform. The chapter explains the process of exercise monitoring,
pose estimation, posture evaluation, FitScore generation, and injury risk detection using deep
learning techniques [2][3].


The analysis additionally focuses on system workflow, movement analysis, rehabilitation
support mechanisms, and browser-based accessibility for tele-rehabilitation applications.


### 3.1 METHODOLOGY


The methodology of FitScore AI involves data collection, pose extraction, deep learning-based
movement analysis, injury risk detection, and feedback generation.


The system initially collects exercise datasets containing movements such as squats, lunges,
push-ups, and bicep curls. Pose estimation techniques are then used to extract body landmarks
from video frames [2]. The extracted skeletal coordinates are normalized for consistent posture
analysis across users.


The system calculates biomechanical parameters including joint alignment, range of motion,
movement symmetry, posture stability, and exercise tempo. These parameters are combined to
generate a FitScore metric ranging from 0 to 100.


A CNN-LSTM hybrid deep learning architecture is implemented for exercise analysis and
posture evaluation [3]. The CNN extracts spatial posture features, while the LSTM network
captures temporal movement patterns during exercise sequences.


The system additionally includes an injury risk detection module capable of identifying
abnormal movement patterns and compensation behaviors [5]. Personalized corrective
suggestions and rehabilitation-focused guidance are also provided [7].


### 3.2 EXPECTED OUTCOME


The proposed FitScore AI system is expected to provide accurate and real-time exercise quality
assessment using pose estimation and deep learning techniques. The platform aims to improve


DEPT.OF CSE(DS), AMCEC 2025-26


### pg. 7




FitScore AI: A Real-Time Exercise Quality Scoring System using Pose Es ma on and Deep-Learning


posture analysis and rehabilitation support through browser-based accessibility and AI-driven
exercise monitoring.


The system is expected to successfully recognize exercises such as squats, lunges, push-ups,
and bicep curls using CNN-LSTM deep learning architecture [3]. The platform will evaluate
exercise quality based on biomechanical parameters including joint alignment, posture
stability, movement symmetry, range of motion, and exercise tempo.


The proposed system is also expected to generate a FitScore metric ranging from 0 to 100 for
measuring exercise performance and posture accuracy. This score will help users understand
their movement quality and identify posture-related errors during exercise sessions.


The Injury Risk Detection Module is expected to identify abnormal posture patterns and
compensation behaviors that may lead to injuries such as knee valgus, improper spinal posture,
and body imbalance [5]. The platform will additionally provide personalized corrective
feedback and rehabilitation-focused guidance to improve exercise quality and posture
correction [7].


The system is further expected to support analytical report generation and longitudinal
performance tracking for rehabilitation monitoring and fitness improvement [8]. By integrating
pose estimation, deep learning, and rehabilitation-focused technologies, the proposed FitScore
AI platform aims to provide an affordable, scalable, and accessible solution for exercise quality
assessment and tele-rehabilitation support.


### SUMMARY


This chapter explained the methodology and expected outcomes of the FitScore AI system. The
methodology included data collection, pose estimation, deep learning-based movement
analysis, injury risk detection, and system integration. The expected outcomes highlighted
accurate exercise quality assessment, adaptive coaching support, analytical reporting, and
browser-based accessibility.


DEPT.OF CSE(DS), AMCEC 2025-26


### pg. 8




FitScore AI: A Real-Time Exercise Quality Scoring System using Pose Es ma on and Deep-Learning


### CHAPTER 4


### SYSTEM REQUIREMENTS


The System Requirements chapter describes the functional, non-functional, hardware, and
software requirements necessary for the successful implementation of the FitScore AI system.
The chapter explains the operational requirements, performance requirements, and feasibility
analysis of the platform.The requirements ensure that the proposed system can perform real-
time posture analysis, movement tracking, injury detection, and analytical reporting efficiently
[3][5].


### 4.1 FUNCTIONAL REQUIREMENT


Functional requirements define the core functionalities and operations performed by the
FitScore AI platform.


- Real-Time Video Capture: The system shall capture real-time webcam video streams for posture analysis and exercise monitoring.

- Pose Estimation: The platform shall extract body landmarks and skeletal coordinates from video frames using pose estimation techniques [2].

- Exercise Recognition: The system shall identify exercises such as squats, lunges, push- ups, and bicep curls using CNN-LSTM deep learning architecture [3].

- FitScore Generation: The platform shall generate a FitScore metric based on biomechanical parameters including: Joint Alignment, Range of Motion, Movement Symmetry, Posture Stability, Exercise Tempo.

- Injury Risk Detection: The system shall detect abnormal movement patterns and posture deviations to identify injury-prone exercise techniques [5].  Corrective Feedback: The platform shall provide adaptive corrective suggestions and rehabilitation-focused guidance to users.  Report Generation: The system shall generate analytical reports and maintain session history for longitudinal performance tracking [8].


### 4.2 NON FUNCTIONAL REQUIREMENT


Non-functional requirements define the quality and performance characteristics of the system.


DEPT.OF CSE(DS), AMCEC 2025-26


### pg. 9




FitScore AI: A Real-Time Exercise Quality Scoring System using Pose Es ma on and Deep-Learning


- Performance Requirement: The system shall maintain low latency and provide real- time posture analysis during exercise sessions. Accuracy Requirement: The CNN-LSTM model shall provide high classification accuracy and reliable posture analysis [3]. Scalability Requirement: The platform shall support future enhancements such as additional exercise support and mobile deployment. Security Requirement: The system shall ensure secure handling of user information and analytical reports. Reliability Requirement: The platform shall maintain uninterrupted performance and reliable session management. Usability Requirement: The application shall provide a user-friendly and responsive browser-based interface.

- 

- 

- 

- 

- 


### 4.3 BASIC OPERATIONAL REQUIREMENT


The operational requirements describe the environmental and system conditions required for
the proper functioning of the FitScore AI platform.


- Lighting conditions: The exercise environment should be properly illuminated to ensure accurate body landmark detection and posture analysis. Poor lighting conditions may reduce pose estimation accuracy and affect exercise quality evaluation.

- Camera Positioning: The webcam should capture the full body of the user during exercise sessions for accurate posture tracking. Proper camera placement helps improve skeletal landmark extraction and movement analysis accuracy.

- Internet Connectivity: A stable internet connection is required for smooth browser operation and report synchronization. Reliable connectivity also supports efficient data transfer and uninterrupted system performance.


Hardware Requirements:


- Processor : Intel Core i5 / AMD Ryzen 5 or above

- RAM : Minimum 8 GB

- Storage : 20 GB SSD

- Webcam : 720p HD Camera


DEPT.OF CSE(DS), AMCEC 2025-26


### pg. 10




FitScore AI: A Real-Time Exercise Quality Scoring System using Pose Es ma on and Deep-Learning


 GPU : NVIDIA GPU (Optional for Deep Learning Training)


Software Requirements:


- Operating System : Windows 10/11, Linux, or macOS

- Programming Language : Python

- Frontend Framework : React.js

- Backend Framework : FastAPI

- Deep Learning Framework : TensorFlow / Keras

- Pose Estimation Library : MediaPipe

- Video Processing Library : OpenCV

- Database : PostgreSQL

- Development Environment : VS Code


### SUMMARY


This chapter explained the functional, non-functional, and operational requirements of the
FitScore AI system. The discussion included the core functionalities of posture analysis,
FitScore generation, injury risk detection, and AI-powered coaching support. Hardware and
software requirements necessary for development and deployment were also presented.


DEPT.OF CSE(DS), AMCEC 2025-26


### pg. 11




FitScore AI: A Real-Time Exercise Quality Scoring System using Pose Es ma on and Deep-Learning


### CHAPTER 5


### SYSTEM DESIGN


The System Design chapter explains the architecture, modules, diagrams, and data flow of the
FitScore AI platform. The chapter focuses on the design of frontend, backend, and database
components responsible for posture analysis, exercise evaluation, injury risk detection, and
rehabilitation support [2][3].The system design additionally describes the interaction between
users, AI modules, and analytical reporting components for real-time exercise monitoring
applications.


### 5.1 SYSTEM ARCHITECTURE


FitScore AI follows a three-tier architecture consisting of frontend, backend, and database
layers. The frontend layer handles webcam access, dashboard visualization, and user
interaction using React.js. The backend layer processes pose estimation, exercise recognition,
FitScore calculation, and injury risk detection using Python and FastAPI.


The system uses MediaPipe pose estimation techniques to extract body landmarks from
webcam video streams in real time [2]. The extracted skeletal coordinates are processed using
CNN-LSTM deep learning architecture for posture analysis and movement evaluation [3].


The generated results such as FitScore values, posture feedback, and injury alerts are displayed
to the user through the frontend interface. The database layer stores user information, exercise
history, and analytical reports for performance tracking and rehabilitation monitoring [8].


### 5.2 USE-CASE DIAGRAM


The Use Case Diagram represents the functional interaction between the user and the FitScore
AI system for intelligent fitness monitoring and posture assessment. The primary actor of the
system is the User, who accesses the application through a browser-based interface. Initially,
the user performs registration and authentication procedures to securely access personalized
functionalities such as exercise tracking, FitScore evaluation, posture correction, dashboard
visualization, and analytical report generation. The authentication mechanism ensures secure
management of user profiles, exercise history, and rehabilitation records while maintaining data
privacy and controlled system access.


DEPT.OF CSE(DS), AMCEC 2025-26


### pg. 12




FitScore AI: A Real-Time Exercise Quality Scoring System using Pose Es ma on and Deep-Learning


Once authenticated, the user initiates a live exercise session through the webcam-enabled
interface. The system captures real-time body movements and processes them using the Pose
Estimation Module, which extracts skeletal landmarks and body joint coordinates using
MediaPipe pose estimation techniques [2]. These skeletal coordinates provide a structured
representation of body posture and movement orientation during exercise execution. The
extracted pose data is normalized and forwarded to the AI processing pipeline for exercise
recognition and biomechanical analysis, enabling accurate tracking of user movements without
requiring wearable sensors or specialized motion-capture hardware.


The normalized skeletal data is analyzed using a CNN-LSTM deep learning architecture for
exercise classification and posture evaluation [3]. The system identifies exercises such as
squats, lunges, push-ups, and bicep curls by analyzing both spatial body posture features and
temporal movement sequences across multiple frames. Based on the recognized exercise
patterns, the system evaluates exercise quality using biomechanical parameters including joint
alignment, posture stability, movement symmetry, range of motion, and exercise tempo.
Additionally, the Injury Risk Detection Module continuously monitors abnormal posture
deviations and compensation movements that may lead to musculoskeletal injuries during
workout sessions [5]. Whenever incorrect posture or improper joint movement is detected, the
system generates real-time corrective feedback and rehabilitation guidance to improve exercise
accuracy and reduce injury risks [7].


Furthermore, the FitScore AI system maintains detailed exercise session records and generates
analytical reports containing FitScore trends, posture analysis summaries, workout consistency
metrics, and rehabilitation progress statistics [8]. These reports assist users, physiotherapists,
and fitness trainers in evaluating long-term fitness improvement and rehabilitation
effectiveness. The system also provides interactive dashboards and AI-driven
recommendations that adapt exercise intensity and workout plans according to user
performance history and recovery progress. By integrating computer vision, deep learning, and
intelligent rehabilitation analytics, the FitScore AI platform delivers an accessible, scalable,
and clinically supportive virtual fitness and posture monitoring solution.


DEPT.OF CSE(DS), AMCEC 2025-26


### pg. 13




FitScore AI: A Real-Time Exercise Quality Scoring System using Pose Es ma on and Deep-Learning


Fig 5.1: Use Case Diagram


Fig 5.1 Represents the interaction between users, admin, and the FitScore AI system
functionalities.


### 5.3 SEQUENCE DIAGRAM


The Sequence Diagram illustrates the sequential interaction between the user, frontend
interface, backend server, pose estimation module, deep learning model, and database during
exercise monitoring and posture evaluation.


The sequence begins when the user starts an exercise session through the browser interface.
The frontend activates the webcam and continuously captures live video frames while the user
performs exercises. These video frames are transmitted to the backend server for further
processing and posture analysis.


The Pose Estimation Module processes the incoming frames and extracts skeletal landmarks
and body joint coordinates using MediaPipe pose estimation techniques [2]. The extracted
landmark sequences are forwarded to the CNN-LSTM Exercise Analysis Module for exercise
recognition and movement evaluation [3].


The CNN-LSTM model analyzes biomechanical parameters such as joint alignment,
movement symmetry, posture stability, exercise tempo, and range of motion. The system then
generates FitScore values and performs injury risk analysis to detect abnormal posture patterns
and movement compensation behaviors [5].


DEPT.OF CSE(DS), AMCEC


2025-26


### pg. 14




FitScore AI: A Real-Time Exercise Quality Scoring System using Pose Es ma on and Deep-Learning


Finally, the generated outputs including FitScore values, injury alerts, posture feedback, and
corrective suggestions are displayed to the user through the frontend interface. The exercise
session details and analytical reports are stored in the database for rehabilitation monitoring
and future performance tracking [8].


Fig 5.2: Sequence Diagram


Fig 5.2 Illustrates the step-by-step interaction flow between the user, frontend, backend, AI
model, and database during fitness analysis.


### 5.4 DATA-FLOW DIAGRAM


The Data Flow Diagram (DFD) illustrates the movement of data within the FitScore AI
platform during exercise monitoring and posture analysis. It represents how input data is
processed by different modules and transformed into meaningful outputs such as FitScore
values, corrective feedback, injury alerts, and analytical reports.


The data flow process begins with the user starting an exercise session through the browser
interface. The webcam captures real-time video frames while the user performs exercises such
as squats, lunges, push-ups, and bicep curls. These video frames act as the primary input data
for the system.


DEPT.OF CSE(DS), AMCEC


2025-26


### pg. 15




FitScore AI: A Real-Time Exercise Quality Scoring System using Pose Es ma on and Deep-Learning


The captured video frames are sent to the Pose Estimation Module, where MediaPipe pose
estimation techniques extract skeletal landmarks and body joint coordinates [2]. The extracted
skeletal data includes information related to body posture, joint positions, and movement
patterns required for exercise analysis and posture evaluation.


The extracted landmark sequences are then forwarded to the Exercise Analysis Module, which
uses CNN-LSTM deep learning architecture for exercise recognition and biomechanical
analysis [3]. The module evaluates parameters such as joint alignment, movement symmetry,
posture stability, range of motion, and exercise tempo to generate a FitScore metric and
determine exercise quality.


The Injury Risk Detection Module further analyzes abnormal posture patterns and movement
compensation behaviors that may lead to injuries [5]. Based on the analysis results, the system
generates corrective suggestions, rehabilitation-focused feedback, FitScore values, and injury
alerts. These outputs are displayed to the user through the frontend interface and additionally
stored in the database for analytical report generation, rehabilitation monitoring, and long-term
performance tracking [8].


Fig 5.3: Data-flow Diagram


Fig 5.3 Shows how user data flows through the FitScore AI system for processing, AI
prediction, recommendation generation, and report storage.


DEPT.OF CSE(DS), AMCEC


2025-26


### pg. 16




FitScore AI: A Real-Time Exercise Quality Scoring System using Pose Es ma on and Deep-Learning


### SUMMARY


This chapter explained the overall system design of FitScore AI, including the architecture,
use-case diagram, sequence diagram, and data-flow diagram. The chapter described the
interaction between frontend, backend, AI modules, and database systems for real-time
exercise quality assessment and reporting.


DEPT.OF CSE(DS), AMCEC 2025-26


### pg. 17




FitScore AI: A Real-Time Exercise Quality Scoring System using Pose Es ma on and Deep-Learning


### REFERENCES


[1] Z. Cao, G. Hidalgo, T. Simon, S. Wei, and Y. Sheikh, "OpenPose: Realtime Multi-


Person 2D Pose Estimation using Part Affinity Fields," IEEE Transactions on Pattern
Analysis and Machine Intelligence, vol. 43, no. 1, pp. 172-186, 2021.


1. [2] Y. Woo and H. Jeong, "Exercise Assessment based on Human Pose Estimation and Relative Phase for Real-Time Remote Exercise System," IEEE Access, vol. 12, pp. 158742-158756, 2024.

2. [3] Y. Liao, J. Vakanski, and M. Xian, "A Deep Learning Framework for Assessing Physical Rehabilitation Exercises," IEEE Transactions on Neural Systems and Rehabilitation Engineering, vol. 28, no. 2, pp. 468-477, 2020.

3. [4] A. Černek, M. Hrúz, and M. Penhaker, "Pose Estimation Analysis and Fine-Tuning on the REHAB24 Dataset for Rehabilitation Support Systems," Information Fusion, vol. 116, 2025.

4. [5 ] A. Tharatipyakul, T. Srikaewsiew, and S. Pongnumkul, "Deep Learning-based Human Body Pose Estimation in Providing Feedback for Physical Movement: A Review," Heliyon, vol. 10, no. 18, 2024.

5. [6] F. Roggio et al., "A Comprehensive Analysis of the Machine Learning Pose Estimation Models in Human Movement Sciences," Heliyon, vol. 10, no. 18, 2024.

6. [7] C. Arrowsmith et al., "Physiotherapy Exercise Classification with Single-Camera P2ose Detection and Machine Learning," Sensors, vol. 23, no. 1, 2023.

7. [8] R. Aguilar-Ortega et al., "UCO Physical Rehabilitation: New Dataset and Study of Pose Estimators for Physical Rehabilitation Exercises," Sensors, vol. 23, no. 21, 2023.


DEPT.OF CSE(DS), AMCEC 2025-26


### pg. 18




FitScore AI: A Real-Time Exercise Quality Scoring System using Pose Es ma on and Deep-Learning


### APPENDICES


### Appendix A: FitScore AI Model Architecture and Pipeline Configuration


Table A1: Implemented Deep Learning and Computer Vision Components Supporting
Real-Time Biomechanical Scoring


<table>
 <tr>
  <th>Module /<br/>Component</th>
  <th>Technology /<br/>Model Used</th>
  <th>Purpose</th>
  <th>Input Type</th>
  <th>Output Generated</th>
 </tr>
 <tr>
  <td>Pose Estimation<br/>Layer</td>
  <td>MediaPipe BlazePose<br/>(33 3D keypoints)</td>
  <td>Extract normalised 3D<br/>skeletal landmarks from<br/>webcam frames in real time</td>
  <td>Raw webcam video<br/>frames (30 FPS)</td>
  <td>3D joint coordinate<br/>vectors (x, y, z)</td>
 </tr>
 <tr>
  <td>Normalisation &amp;<br/>Angle<br/>Computation</td>
  <td>Hip-centre<br/>normalisation;<br/>arctan2 geometry</td>
  <td>Scale-invariant coordinate<br/>normalisation and clinically<br/>relevant joint angle<br/>extraction</td>
  <td>Raw 3D landmark<br/>vectors</td>
  <td>Normalised angle<br/>vectors (knee, shoulder,<br/>hip, elbow)</td>
 </tr>
 <tr>
  <td>CNN-LSTM<br/>Exercise<br/>Classifier</td>
  <td>1D-CNN + LSTM<br/>hybrid; 30-frame<br/>sliding window</td>
  <td>Classify exercise type and<br/>assess quality by learning<br/>spatial joint relationships<br/>and temporal motion<br/>patterns</td>
  <td>Normalised<br/>landmark sequences<br/>(30 frames x 132<br/>features)</td>
  <td>Exercise label +<br/>confidence score (&gt;<br/>75%)</td>
 </tr>
 <tr>
  <td>FitScore Metric<br/>Engine</td>
  <td>Weighted composite<br/>scoring formula</td>
  <td>Compute multi-<br/>dimensional exercise<br/>quality score across<br/>alignment, ROM,<br/>symmetry, and tempo</td>
  <td>Joint angle vectors +<br/>repetition timing data</td>
  <td>FitScore (0-100) with<br/>sub-scores per<br/>dimension</td>
 </tr>
 <tr>
  <td>FSM Repetition<br/>Counter</td>
  <td>Finite State Machine<br/>(Start -&gt; Down -&gt;<br/>Up); geometric<br/>heuristics</td>
  <td>Accurately count valid<br/>repetitions and reject partial<br/>or incorrect movements</td>
  <td>Joint angle time<br/>series per session</td>
  <td>Rep count + phase state<br/>(start / peak / complete)</td>
 </tr>
 <tr>
  <td>Injury Risk<br/>Stratification<br/>Engine</td>
  <td>Rule-based + ML-<br/>hybrid compensation<br/>detector</td>
  <td>Detect injury-prone<br/>compensation patterns such<br/>as knee valgus, anterior<br/>pelvic tilt, and shoulder<br/>impingement</td>
  <td>FitScore + joint angle<br/>deviation flags</td>
  <td>Risk tier: Low /<br/>Moderate / High +<br/>flagged joint</td>
 </tr>
 <tr>
  <td>LLM Coaching<br/>Assistant</td>
  <td>GPT-4o API via<br/>LangChain (context-<br/>aware prompting)</td>
  <td>Generate personalised<br/>corrective feedback and<br/>adaptive rehabilitation<br/>plans based on FitScore and<br/>risk tier</td>
  <td>FitScore, risk tier,<br/>injury profile, dietary<br/>data</td>
  <td>Contextualised coaching<br/>text and adaptive weekly<br/>plans</td>
 </tr>
 <tr>
  <td>Analytics &amp;<br/>Reporting<br/>Module</td>
  <td>ReportLab PDF<br/>engine; Recharts<br/>visualisation</td>
  <td>Aggregate session metrics<br/>and generate medical-grade<br/>downloadable reports with<br/>heatmaps</td>
  <td>Session history,<br/>FitScore trends,<br/>muscle activation<br/>data</td>
  <td>PDF reports + dashboard<br/>charts (accuracy trend,<br/>muscle focus)</td>
 </tr>
</table>


The proposed FitScore AI framework integrates MediaPipe BlazePose for 3D skeletal tracking, a CNN-


Note:


LSTM hybrid model for exercise classification and quality scoring, and a context-aware LLM assistant for


### DEPT.OF CSE(DS), AMCEC 2025-26


pg. 19




#### FitScore AI: A Real-Time Exercise Quality Scoring System using Pose Es ma on and Deep-Learning


adaptive coaching. The implemented modules collectively improve biomechanical analysis accuracy, injury risk
detection reliability, and longitudinal rehabilitation tracking across fitness and tele-rehabilitation applications.


### Appendix B: CNN-LSTM Model Training Data Preparation


### Table B1: Key Performance Metrics Across All CNN-LSTM Training Configurations


<table>
 <tr>
  <th>Configuration</th>
  <th>Accuracy<br/>(%)</th>
  <th>Loss</th>
  <th>Precision</th>
  <th>Recall</th>
  <th>F1-Score</th>
  <th>Key Issue / Observation</th>
 </tr>
 <tr>
  <td>Baseline: 30-frame<br/>window, Adam, dropout<br/>0.3, 50 epochs</td>
  <td>82.4</td>
  <td>0.541</td>
  <td>0.814</td>
  <td>0.803</td>
  <td>0.808</td>
  <td>Moderate overfitting;<br/>confusion between<br/>bilateral exercise variants<br/>(Left vs Right)</td>
 </tr>
 <tr>
  <td>Stride 5, sliding window<br/>augmentation, 80 epochs</td>
  <td>88.7</td>
  <td>0.423</td>
  <td>0.876</td>
  <td>0.871</td>
  <td>0.873</td>
  <td>Improved generalisation;<br/>hip-centre normalisation<br/>resolved body-type<br/>variance</td>
 </tr>
 <tr>
  <td>Stride 5 + BatchNorm +<br/>dropout 0.3, 100 epochs</td>
  <td>92.1</td>
  <td>0.318</td>
  <td>0.914</td>
  <td>0.909</td>
  <td>0.911</td>
  <td>Best performance; stable<br/>convergence; rare<br/>confusion on Pendulum<br/>Swing variants</td>
 </tr>
 <tr>
  <td>LSTM units 128<br/>(increased), same<br/>augmentation, 100 epochs</td>
  <td>91.3</td>
  <td>0.335</td>
  <td>0.905</td>
  <td>0.899</td>
  <td>0.902</td>
  <td>Marginal drop vs Config<br/>3; higher compute cost<br/>with no accuracy gain</td>
 </tr>
 <tr>
  <td>Final deployed: Config 3<br/>+ confidence threshold<br/>75%, FSM validation</td>
  <td>93.6</td>
  <td>0.297</td>
  <td>0.929</td>
  <td>0.924</td>
  <td>0.926</td>
  <td>FSM gate eliminated<br/>false positive reps;<br/>deployed on 19-class<br/>exercise set</td>
 </tr>
</table>


Note: Accuracy (%): Percentage of correctly classified exercise sequences on held-out test set; Loss: Categorical
cross-entropy; Precision: Ratio of true positives to all predicted positives; Recall: Ratio of true positives to all
actual positives; F1-Score: Harmonic mean of Precision and Recall. All configurations trained on 80/10/10
train/validation/test split with Adam optimiser on a dataset of 19 rehabilitation exercise classes.


### No Publication Yet


### PUBLICATION DETAILS


DEPT.OF CSE(DS), AMCEC


2025-26


### pg. 20




FitScore AI: A Real-Time Exercise Quality Scoring System using Pose Es ma on and Deep-Learning


DEPT.OF CSE(DS), AMCEC 2025-26


### pg. 21


